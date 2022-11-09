import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import styles from "../../styles/VlasnikForm.module.scss";

export default function VlasnikForm(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
    const [craftName, setCraftName] = useState("");
    const [craftAddres, setCraftAddress] = useState("");
    const [craftOIB, setCraftOIB] = useState("");
    const [craftPhone, setCraftPhone] = useState("");
    const [craftDesc, setCraftDesc] = useState("");
    const [craftType, setCraftType] = useState("");

    const craftTypes = [
        "parkić",
        "plaža",
        "dućan",
        "kafić",
        "restoran",
        "veterinarska ambulanta",
        "frizerski salon",
    ]

    const { firebaseCreateUserEmailPass } = useAuth();
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

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="input-container">
				<label htmlFor="username">username:</label>
				<input
					name="username"
					type="text"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="email">email:</label>
				<input
					name="email"
					type="email"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password">password:</label>
				<input
					name="password"
					type="password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="passwordconfirm">confirm password:</label>
				<input
					name="passwordconfirm"
					type="password"
					value={confirmPassword}
					onChange={(event) => {
						setConfirmPassword(event.target.value);
					}}
				/>
			</div>
			<input className={styles.button} type="submit" value="Sign Up" />
		</form>
	);
}
