import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/PrivatnaForm.module.scss";
import { useMyHooks } from "../../lib/hooks";

export default function PrivatnaForm(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const [loading, setLoading] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [disabled, setDisabled] = useState(true);

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
			console.log("enabled");
			setDisabled(false);
		} else {
			console.log("disabled");
			setDisabled(true);
		}
	}, [username, password, email, usernameExists, loading]);

	const { firebaseCreateUserEmailPass } = useAuth();
	const { checkPasswordBlacklist } = useMyHooks();
	const router = useRouter();

	function handleSubmit(event) {
		event.preventDefault();

		firebaseCreateUserEmailPass(username, email, password)
			.then(async (authUser) => {
				//Signed in
				router.push("/");
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ..
			});
	}

	useEffect(() => {
		checkUsernameAndEmail(username, email);
	}, [username, email]);

	const checkUsernameAndEmail = useCallback(
		debounce(async (username, email) => {
			setUsernameExists(false);
			setEmailExists(false);
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) => {
				if (doc.data().username === username) {
					console.log("username exists");
					setUsernameExists(true);
				}
				if (doc.data().email === email) {
					console.log("email exists");
					setEmailExists(true);
				}
			});
			setLoading(false);
		}, 500),
		[]
	);

	const checkPassword = useCallback(
		debounce(async (password) => {
			setLoading(true);
			if (password.length < 8) {
				setPasswordError("Password must be at least 8 characters");
			} else {
				const isBlacklisted = await checkPasswordBlacklist(password);
				if (isBlacklisted) {
					setPasswordError("Password blacklisted, too common!");
					setLoading(false);
				} else {
					setPasswordError("");
					setLoading(false);
				}
			}
		}, 500),
		[]
	);

	return (
		<form onSubmit={handleSubmit}>
			<div className="input-container">
				<input
					name="username"
					type="text"
					value={username}
					placeholder="username"
					onChange={(event) => {
						setUsername(event.target.value);
						setLoading(true);
					}}
				/>
				{usernameExists && (
					<p className="error">Username already exists</p>
				)}
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
