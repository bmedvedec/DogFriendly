import styles from "../styles/register.module.scss";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../lib/context";

// funkcija za login sa emailom i passwordom koja prima parametre email i password u sklopu params objekta
export default function Login(params) {
    // inicijalizacija hook state-a za email i password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // inicijalizacija hook-a za autentifikaciju
  const { firebaseEmailPassSignIn } = useAuth();
  const router = useRouter();

  //funckija koja se izvrsava na pritisak gumba
  function handleSubmit(event) {
    event.preventDefault();

    // predajemo email i password custom hooku koji komunicira sa firebaseom
    // ako je uspjesno autentificiranje, preusmjeri na pocetnu stranicu
    firebaseEmailPassSignIn(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  // prikaz forme za login
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
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
}
