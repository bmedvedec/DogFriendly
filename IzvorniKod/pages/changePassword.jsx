import styles from "../styles/userinfo.module.scss";
import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import { getAuth, updatePassword } from "firebase/auth";
import { useMyHooks } from "../lib/hooks";
import Link from "next/link";


export default function changePassword() {
	// inicijalizacija hook state-a
	const { authUser, firebaseSignOut } = useAuth();

	const [loading, setLoading] = useState(false);

	const [newPassword, setNewPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [disabled, setDisabled] = useState(false); // disabled state za submit button

	const { checkPasswordBlacklist } = useMyHooks();

	// funkcija (hook) koja se izvrsava svaki put kada se promijeni vrijednost new password
	useEffect(() => {
		if (
			newPassword &&
			!passwordError &&

			!loading
		) {
			// ako su sva polja popunjena i nema gresaka, omoguci submit button, inace onemoguci
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [newPassword, loading]); // state-ovi koji se provjeravaju

	useEffect(() => {
		if (
			confirmPassword &&
			!confirmPasswordError &&

			!loading
		) {
			// ako su sva polja popunjena i nema gresaka, omoguci submit button, inace onemoguci
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [confirmPassword, loading]); // state-ovi koji se provjeravaju


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

	const checkConfirmPassword = useCallback(
		// check if newPassword and confirmPassword are equal

		debounce(async (confirmPassword) => {
			setLoading(true);
			if (confirmPassword !== newPassword) { // ako je password manji od 8 znakova, postavi passwordError
				setConfirmPasswordError("Passwords do not match");
			} else {
				setConfirmPasswordError("");
				setLoading(false);
			}
		}, 500),
		[newPassword]
	);


	// function which updates password in firestore
	async function changePassword(event) {

		event.preventDefault(); // sprijecava ponovno ucitavanje stranice

		console.log(newPassword);
		const auth = getAuth();
		const user = auth.currentUser;
		console.log(user);

		updatePassword(user, newPassword)
			.then(() => {
				console.log("Password updated!");
				alert("Password changed!")

				//after pressing ok on alert go to userinfo page
				window.location.href = "/userInfo";

			})
			.catch((error) => {
				console.log(error);

			});
	}


	return (
		<div className={styles.background}>
			<header className={styles.header}>
				<Link href="/"><span style={{ fontWeight: "bold" }}>Dog Friendly</span></Link>
				{authUser ? (
					<div className={styles.right}>
						<div className={styles.accountInfo}>
							<img src="/corgiHeader.png" alt="corgi header Icon for user" />
							<Link href="/userInfo">Profile</Link>
						</div>
						<Link href="/"><span onClick={firebaseSignOut}><i>Sign out</i></span></Link>
					</div>
				) : (
					<div className={styles.right}>
						<div className={styles.loginOrRegister}>
							<Link href="/login"><i>Login</i></Link>
							or
							<Link href="/register"><i>Register</i></Link>
						</div>
					</div>
				)}
			</header>

			<div className={styles.body}>

				<form className={styles.center} onSubmit={changePassword}>
					<h1 className={styles.changeTitle}>Change password</h1>

					<div className="input-container">

						<input
							name="newPassword"
							type="password"
							placeholder="New password"
							onChange={(event) => {
								// svaki put kada se promijeni vrijednost password-a, pozovi funkciju checkPassword
								setLoading(true);
								setNewPassword(event.target.value);
								checkPassword(event.target.value);
							}}
						/>
						{passwordError && <p className="error">{passwordError}</p>}

					</div>

					<div className="input-container">

						<input
							name="confirmPassword"
							type="password"
							placeholder="Confirm password"
							onChange={(event) => {
								// svaki put kada se promijeni vrijednost password-a, pozovi funkciju checkPassword
								setLoading(true);
								setConfirmPassword(event.target.value);
								checkConfirmPassword(event.target.value);
							}}
						/>
						{confirmPasswordError && <p className="error">{confirmPasswordError}</p>}

					</div>

					<input
						className={styles.changeButton}
						type="submit"
						value="Save changes"
						disabled={disabled}
					/>
				</form>
			</div>
		</div>
	);

}
