import styles from "../styles/register.module.scss";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../lib/context";

export default function Login(params) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { firebaseEmailPassSignIn } = useAuth();
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();

        firebaseEmailPassSignIn(email, password)
            .then((authUser) => {
                //Signed in
                router.push("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <Layout page="Login">
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h1>Login</h1>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <input
                            className="button"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}