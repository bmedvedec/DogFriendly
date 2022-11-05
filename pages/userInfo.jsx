import Layout from "../components/layout";
import { useAuth } from "../lib/context";

export default function UserInfo() {
    const { authUser, loading } = useAuth();
    console.log("user: ", authUser);
    return (
        <Layout>
            <h1>user info</h1>
            <p>{authUser ? authUser.uid : "no user"}</p>
        </Layout>
    );
}