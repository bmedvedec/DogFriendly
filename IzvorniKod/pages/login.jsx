import styles from "../styles/login.module.scss";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/context";
import { CircularProgress } from "@mui/material";

// funkcija za login sa emailom i passwordom koja prima parametre email i password u sklopu params objekta
export default function Login(params) {
	const router = useRouter();
	const { authUser, loading } = useAuth();

	useEffect(() => {
		if (authUser && !loading) {
			router.push("/");
		}
	}, [authUser, loading]);

	// inicijalizacija hook state-a za email i password
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [checking, setChecking] = useState(false);
	const [disabled, setDisabled] = useState(true);
	// inicijalizacija hook-a za autentifikaciju
	const { firebaseEmailPassSignIn } = useAuth();

	//funckija koja se izvrsava na pritisak gumba
	function handleSubmit(event) {
		event.preventDefault(); // sprijecava ponovno ucitavanje stranice
		setChecking(true);

		// predajemo email i password custom hooku koji komunicira sa firebaseom
		// ako je uspjesno autentificiranje, preusmjeri na pocetnu stranicu, inace postavi error sa porukom
		firebaseEmailPassSignIn(email, password)
			.catch((error) => {
				setError(
					"User with this email and password combination does not exist"
				);
			})
			// .then((authUser) => {
			// 	router.push("/");
			// });

		setChecking(false);
	}

	// funkcija (hook) koja se izvrsava svaki put kada se promijeni vrijednost email ili password
	// ako oba polja zadovoljavaju uvjete, omoguci submit button, inace onemoguci
	useEffect(() => {
		if (
			email.includes("@") &&
			email.length >= 5 &&
			!email.includes(" ") &&
			password.length >= 8
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [email, password]);

	// kod za prikaz login forme
	if (!authUser && loading) {
		return null;
	} else {
		return (
			<Layout page="Login">
				<div className={styles.container}>
					<div className={styles.leftSide}>
						<form onSubmit={handleSubmit}>
							<div className={styles.appName}>
								<a href="/">
									<p>
										<b>Dog Friendly</b>
									</p>
								</a>
							</div>

							<div className={styles.heading}>
								<h1 className={styles.headingWelcome}>
									Welcome Back
								</h1>
								<h2 className={styles.headingLogin}>Login</h2>
							</div>

							{/* loading animacija koja se prikazuje dok je loading true */}
							{checking && (
								<CircularProgress
									style={{ color: "#b847bd" }}
									size="1.2rem"
								/>
							)}
							{error && (
								<p
									className="error"
									style={{ textAlign: "center" }}
								>
									{error}
								</p>
							)}

							<div className="email-container">
								<input
									type="email"
									value={email}
									placeholder="email"
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</div>

							<div className="password-container">
								<input
									type="password"
									value={password}
									placeholder="password"
									onChange={(event) => {
										setPassword(event.target.value);
									}}
								/>
							</div>
							<input
								className={styles.button}
								type="submit"
								value="Login"
								disabled={disabled}
							/>
						</form>
					</div>

					<div className={styles.rightSide}>
						<div className={styles.signup}>
							<p>
								New User?{" "}
								<a href="/register" className={styles.link}>
									<b>Sign up</b>
								</a>
							</p>
						</div>

						<img
							src="/corgi.png"
							alt="corgi"
							className={styles.dog}
						/>
						<p className="text">
							<b>Discover</b> new places with your furry best
							friend.
						</p>
					</div>
				</div>
			</Layout>
		);
	}
}
