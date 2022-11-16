import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import {useEffect, useState} from "react";
import { async } from "@firebase/util";

export default function UserInfo() {
    // sprema kontekst autentifikacije u authUser
    const { authUser } = useAuth();
    // inicijalizacija hook state-a za podatke o korisniku, podatke o firmi i da li je korisnik vlasnik firme
    const [userInfo, setUserInfo] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);

    // funkcija koja povlaci podatke o korisniku iz baze i ako je korisnik vlasnik firme, povlaci i podatke o firmi
    // poziva se na promjenu authUser-a
    useEffect(() => {
        async function getUserInfo() {
            const docRef = doc(db, "users", authUser.uid); // referenca na dokument korisnika
            const docSnap = await getDoc(docRef); // povlaci podatke o korisniku iz baze koji imaju id jednak authUser.uid
            if (docSnap.exists()) { // ako postoji dokument sa tim id-em
                setUserInfo(docSnap.data()); // sprema podatke o korisniku u hook state
                if (docSnap.data().companyOwner) { // ako je korisnik vlasnik firme
                    const companyRef = collection(db, "companies"); // referenca na kolekciju firmi
                    const companySnap = await getDocs(companyRef); // povlaci sve dokumente iz kolekcije firmi
                    companySnap.forEach((doc) => { // prolazi kroz sve dokumente iz kolekcije firmi
                        if (doc.data().owner === authUser.uid) { // ako je id vlasnika firme jednak authUser.uid
                            setCompanyInfo(doc.data()); // sprema podatke o firmi u hook state
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

    // kod za prikaz podataka o korisniku
    return (
        <Layout>
            <h1>User info</h1>
            {userInfo && <p>{userInfo.username}</p>}
            {userInfo && <p>{userInfo.email}</p>}
            <br/>
            {companyInfo && <p><b>Company info</b></p>}
            {companyInfo && <p>{companyInfo.name}</p>}
            {companyInfo && <p>{companyInfo.address}</p>}
            {companyInfo && <p>{companyInfo.description}</p>}
            {companyInfo && <p>{companyInfo.phone}</p>}
            {companyInfo && <p>{companyInfo.type}</p>}
        </Layout>
    )
}