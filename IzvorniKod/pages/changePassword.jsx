import styles from "../styles/login.module.scss";
import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { async } from "@firebase/util";
import PlacanjeForm from "../components/forms/PlacanjeForm";
import PersonalForm from "../components/forms/PersonalForm";
import CompanyForm from "../components/forms/CompanyForm";
import Header from "../components/Header";
import { getAuth, updatePassword } from "firebase/auth";
import { useMyHooks } from "../lib/hooks";



export default function changePassword() {
	// inicijalizacija hook state-a

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
		<Layout>
			<Header />

			<div className={styles.login}>
				<h1>Change password</h1>

				<form onSubmit={changePassword}>

					<div className="input-container">
						<label htmlFor="newPassword">New password</label>

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
						<label htmlFor="confirmPassword">Confirm password</label>

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
						className={styles.button}
						type="submit"
						value="Save changes"
						disabled={disabled}
					/>
				</form>
			</div>





		</Layout>
	);

}
