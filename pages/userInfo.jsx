import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";


// export default function userInfo() {
//     const { authUser, loading } = useAuth();
//     console.log("user: ", authUser);
//     return (
//         <Layout>
//             <h1>user info</h1>
//             <p>{authUser ? authUser.uid : "no user"}</p>
//         </Layout>
//     );}
const {authUser} = useAuth();

const docRef = doc(db, "users", authUser.uid);

export default async function userInfo() {
    const docSnap = await getDoc(docRef);
    console.log("user: ", docSnap.data());

    const username = docSnap.get("username");
    console.log("username: ", username);
    const email = docSnap.get("email");

    console.log("user: ", authUser);
    return (
        <Layout>
            <h1>user info</h1>
            <p>{authUser ? authUser.uid : "no user"}</p>
            {/* <p>{username}</p>
            <p>{email}</p> */}
        </Layout>
    );
}

