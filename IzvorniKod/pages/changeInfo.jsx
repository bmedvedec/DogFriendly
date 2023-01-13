import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/userInfo.module.scss";
import debounce from "lodash.debounce";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";


export default function UserInfo() {
    // sprema kontekst autentifikacije u authUser
    const { authUser } = useAuth();

    const currentUser = getAuth().currentUser;

    const [userInfo, setUserInfo] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    //hookovi za username
    const [username, setUsername] = useState("");
    const [usernameExists, setUsernameExists] = useState(false);

    const [userUid, setUserUid] = useState();
    const [companyId, setCompanyId] = useState();

    //hookovi za companyName i companyDescription
    const [companyName, setCompanyName] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");

    const [companyDesc, setCompanyDesc] = useState("");
    const [companyDescError, setCompanyDescError] = useState("");



    // funkcija (hook) koja se izvrsava svaki put kada se promijeni vrijednost username, companyName i companyDesc
    useEffect(() => {
        console.log("username err " + !usernameExists);
        console.log("comp name err " + !companyNameError);
        console.log("comp desc err " + !companyDescError);
        if (!companyInfo) {
            if (
                username &&
                !usernameExists &&

                !loading
            ) {
                // ako nema gresaka, omoguci submit button, inace onemoguci
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        } else {
            if (
                username &&
                !usernameExists &&

                companyName &&
                !companyNameError &&

                companyDesc &&
                !companyDescError &&

                !loading
            ) {
                // ako nema gresaka, omoguci submit button, inace onemoguci
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [username, companyName, companyDesc, loading]); // state-ovi koji se provjeravaju


    // funkcija koju poziva forma na pritisak gumba
    async function handleSave(event) {
        event.preventDefault(); // sprijecava ponovno ucitavanje stranice

        let isExecuted = confirm("Are you sure you want to save your changes?");

        if (isExecuted) {


            // update podataka o korisniku u bazi
            const docRef = doc(db, "users", userUid);
            setUsername(username);

            await updateDoc(docRef, {
                username: username,
            }).then(() => {
                console.log("Username successfully updated!");

            }).catch((error) => {

                console.error("Error updating document: ", error);
            });

            // update podataka o firmi u bazi
            if (userInfo.companyOwner) {
                const companyRef = doc(db, "companies", companyId);

                setCompanyName(companyName);
                setCompanyDesc(companyDesc);

                await updateDoc(companyRef, {
                    name: companyName,
                    description: companyDesc
                }).then(() => {
                    console.log("CompanyInfo successfully updated!");

                }).catch((error) => {


                    console.error("Error updating document: ", error);
                });

            }

        }


    }

    // funkcija koja provjerava username u bazi
    const checkUsername = useCallback(
        debounce(async (username) => {
            setUsernameExists(false);
            setLoading(true);

            const querySnapshot = await getDocs(collection(db, "users")); // dohvati sve korisnike iz baze

            querySnapshot.forEach((doc) => {

                if (doc.data().username === username && doc.id !== userUid) {
                    // ako postoji korisnik s istim username-om, postavi usernameExists na true
                    setUsernameExists(true);
                }

            });
            setLoading(false);
        }, 500),
        []
    );

    // funkcija za provjeru ispravnosti naziva tvrtke
    // naziv tvrtke mora biti duzi od 3 znaka, ne smiju biti svi brojevi i ne smije vec postojat u bazi
    const checkCompanyName = useCallback(
        debounce(async (companyName) => {
            setLoading(true);
            const companiesRef = collection(db, "companies"); // referenca na kolekciju tvrtki
            const companiesSnap = await getDocs(companiesRef); // dohvaca kolekciju companies iz baze

            if (companyName.length < 3) {
                setCompanyNameError(
                    "Company name must be at least 3 characters"
                );
                setLoading(false);
            } else if (!isNaN(companyName)) {
                setCompanyNameError("Company name cannot be all numbers");
                setLoading(false);
            } else {
                setCompanyNameError("");
            }

            companiesSnap.forEach((doc) => {
                if (doc.data().name === companyName && doc.id !== companyId) {
                    setCompanyNameError("Company name already exists");
                    setLoading(false);
                }
            });

            setLoading(false);
        }, 500),
        []
    );


    const checkCompanyDesc = useCallback(
        debounce(async (companyDesc) => {
            setLoading(true);
            if (companyDesc.length < 30) {
                setCompanyDescError(
                    "Description must be at least 30 characters"
                );
                setLoading(false);
            } else {
                setCompanyDescError("");
                setLoading(false);
            }
        }, 500),
        []
    );

    // funkcija koja povlaci podatke o korisniku iz baze i ako je korisnik vlasnik firme, povlaci i podatke o firmi
    // poziva se na promjenu authUser-a
    useEffect(() => {
        async function getUserInfo() {
            const docRef = doc(db, "users", authUser.uid); // referenca na dokument korisnika
            const docSnap = await getDoc(docRef); // povlaci podatke o korisniku iz baze koji imaju id jednak authUser.uid
            if (docSnap.exists()) {
                // ako postoji dokument sa tim id-em
                setUserInfo(docSnap.data());
                setUsername(docSnap.data().username)
                setUserUid(docSnap.id) // sprema podatke o korisniku u hook state

                if (docSnap.data().companyOwner) {
                    // ako je korisnik vlasnik firme
                    const companyRef = collection(db, "companies"); // referenca na kolekciju firmi
                    const companySnap = await getDocs(companyRef); // povlaci sve dokumente iz kolekcije firmi
                    companySnap.forEach((doc) => {
                        // prolazi kroz sve dokumente iz kolekcije firmi
                        if (doc.data().owner === authUser.uid) {
                            // ako je id vlasnika firme jednak authUser.uid
                            setCompanyInfo(doc.data());
                            setCompanyId(doc.id)
                            setCompanyName(doc.data().name)
                            setCompanyDesc(doc.data().description) // sprema podatke o firmi u hook state

                        }
                    });
                }
            } else {
                console.log("No such document!");
            }
        }
        if (authUser) {
            getUserInfo();
        }
    }, [authUser]);


    // prikaži izmjenjivu formu koja kao inicijalne vrijednosti ima podatke o korisniku
    // ako je korisnik vlasnik firme, prikaži i podatke o firmi

    // onChange={(event) => {
    //     setLoading(true);
    //     setCompanyName(event.target.value);
    // }}

    return (
        <div className={styles.background}>
            <Layout>
                <Header />
                <div className="modal">

                    <form onSubmit={
                        (event) => {
                            handleSave(event).then(() => {
                                alert("Your changes have been saved")

                                //after pressing ok on alert go to userinfo page
                                window.location.href = "/userInfo";

                            })
                        }
                    }>

                        {userInfo && <h1>Username: </h1>}

                        {userInfo && <>
                            <div className="input-container">
                                <input
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(event) => {
                                        setLoading(true);
                                        setUsername(event.target.value);
                                        checkUsername(event.target.value);
                                    }}
                                />
                                {/* prikaz greske ispod inputa ako je state postavljen na true */}
                                {usernameExists && (<p className="error">Username already exists</p>)}
                            </div>

                        </>
                        }
                        {companyInfo && <h1>Company name: </h1>}

                        {companyInfo &&

                            <div className="input-container">
                                <input
                                    name="companyName"
                                    type="text"
                                    value={companyName}
                                    onChange={(event) => {
                                        setLoading(true);
                                        setCompanyName(event.target.value);
                                        checkCompanyName(event.target.value);
                                    }}
                                />
                                {companyNameError && (
                                    <p className="error">{companyNameError}</p>
                                )}
                            </div>

                        }
                        {companyInfo &&
                            <div className="input-container">
                                <input
                                    name="companyDesc"
                                    type="text"
                                    value={companyDesc}
                                    onChange={(event) => {
                                        setLoading(true);
                                        setCompanyDesc(event.target.value);
                                        checkCompanyDesc(event.target.value);
                                    }}
                                />
                                {companyDescError && (
                                    <p className="error">{companyDescError}</p>
                                )}
                            </div>
                        }

                        <input
                            className={styles.button}
                            type="submit"
                            value="Save changes"
                            disabled={disabled}
                        />
                    </form>
                </div>
            </Layout>
        </div>
    );

}
