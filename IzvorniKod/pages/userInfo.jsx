import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import {useEffect, useState} from "react";
import { async } from "@firebase/util";

//get user info from firestore and if user is companyOwner, get company info from firestore
export default function UserInfo() {
    const { authUser } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [companyOwner, setCompanyOwner] = useState(false);

    useEffect(() => {
        async function getUserInfo() {
            const docRef = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                if (docSnap.data().companyOwner) {
                    //setCompanyOwner(true);
                    const companyRef = collection(db, "companies");
                    const companySnap = await getDocs(companyRef);
                    companySnap.forEach((doc) => {
                        if (doc.data().owner === authUser.uid) {
                            setCompanyInfo(doc.data());
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