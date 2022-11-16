import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/PrivatnaForm.module.scss";
import { useMyHooks } from "../../lib/hooks";

// Komponenta koja prikazuje formu za unos podataka privatne osobe
export default function PrivatnaForm(params) {
	// inicijalizacija hook state-a za podatke privatne osobe
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	// definirani hook state-ovi za prikaz gresaka
	const [loading, setLoading] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [disabled, setDisabled] = useState(true);

	// funkcija (hook) koja se izvrsava svaki put kada se promijeni vrijednost email, password, username ili loading
	useEffect(() => {
		if (
			username &&
			password &&
			email &&
			!usernameExists &&
			!emailExists &&
			!passwordError &&
			!loading
		) {
			// ako su sva polja popunjena i nema gresaka, omoguci submit button, inace onemoguci
			console.log("enabled");
			setDisabled(false);
		} else {
			console.log("disabled");
			setDisabled(true);
		}
	}, [username, password, email, usernameExists, loading]); // state-ovi koji se provjeravaju

	// inicijaizacija hook-a za autentifikaciju i provjeru password-a
	const { firebaseCreateUserEmailPass } = useAuth();
	const { checkPasswordBlacklist } = useMyHooks();
	const router = useRouter();

	// funkcija koju poziva forma na pritisak gumba
	function handleSubmit(event) {
		event.preventDefault(); // sprijecava ponovno ucitavanje stranice

		// funkcija koja kreira korisnika u firebase-u, a prima email, password i username
		firebaseCreateUserEmailPass(username, email, password)
			.then(async (authUser) => {
				router.push("/"); // nakon uspjesne registracije, preusmjeri na pocetnu stranicu (index)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	}

	// hook koji se poziva svaki put kada se promijeni vrijednost username ili email, a obavlja provjeru username-a i email-a u bazi
	useEffect(() => {
		checkUsernameAndEmail(username, email);
	}, [username, email]);

	// funkcija koja provjerava username i email u bazi
	const checkUsernameAndEmail = useCallback(
		debounce(async (username, email) => {
			setUsernameExists(false);
			setEmailExists(false);
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, "users")); // dohvati sve korisnike iz baze
			querySnapshot.forEach((doc) => {
				if (doc.data().username === username) {
					// ako postoji korisnik s istim username-om, postavi usernameExists na true
					console.log("username exists");
					setUsernameExists(true);
				}
				if (doc.data().email === email) {
					// ako postoji korisnik s istim email-om, postavi emailExists na true
					console.log("email exists");
					setEmailExists(true);
				}
			});
			setLoading(false);
		}, 500),
		[]
	);

	// funkcija koja provjerava password na blacklistu i ostale zahtjeve password-a
	const checkPassword = useCallback(
		debounce(async (password) => {
			setLoading(true);
			if (password.length < 8) { // ako je password manji od 8 znakova, postavi passwordError
				setPasswordError("Password must be at least 8 characters");
			} else {
				const isBlacklisted = await checkPasswordBlacklist(password);
				if (isBlacklisted) { // ako je password na blacklisti, postavi passwordError
					setPasswordError("Password blacklisted, too common!");
					setLoading(false);
				} else { // inace postavi passwordError na prazan string
					setPasswordError("");
					setLoading(false);
				}
			}
		}, 500),
		[]
	);

	// kod za prikaz privatne forme
	return (
		<form onSubmit={handleSubmit}>
			<div className="input-container">
				<input
					name="username"
					type="text"
					value={username}
					placeholder="username"
					onChange={(event) => {
						setLoading(true);
						setUsername(event.target.value);
					}}
				/>
				{/* prikaz greske ispod inputa ako je state postavljen na true */}
				{usernameExists && (<p className="error">Username already exists</p>)}
			</div>

			<div className="input-container">
				<input
					name="email"
					type="email"
					value={email}
					placeholder="email"
					onChange={(event) => {
						setLoading(true);
						setEmail(event.target.value);
					}}
				/>
				{emailExists && <p className="error">Email already exists</p>}
			</div>

			<div className="input-container">
				<input
					name="password"
					type="password"
					value={password}
					placeholder="password"
					onChange={(event) => {
						// svaki put kada se promijeni vrijednost passworda, pozovi funkciju checkPassword
						setLoading(true);
						setPassword(event.target.value);
						checkPassword(event.target.value);
					}}
				/>
				{passwordError && <p className="error">{passwordError}</p>}
			</div>

			<input
				className={styles.button}
				type="submit"
				value="Sign Up"
				disabled={disabled}
			/>
		</form>
	);
}