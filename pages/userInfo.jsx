import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {useEffect, useState} from "react";

export default function userInfo() {
    const { authUser, loading } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (authUser) {
            const docRef = doc(db, "users", authUser.uid);
            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    setUserInfo(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [authUser]);

    return (
        <Layout>
            <h1>User info</h1>
            {userInfo && <p>{userInfo.username}</p>}
            {userInfo && <p>{userInfo.email}</p>}
        </Layout>
    )
}