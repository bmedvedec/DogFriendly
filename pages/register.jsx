import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/register.module.scss";
import { useAuth } from "../lib/context";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Register(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const { authUser, firebaseCreateUserEmailPass } = useAuth();
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
		<Layout page="Register">
			<div className={styles.container}>
				<form onSubmit={handleSubmit}>
					<div className="card">
						<h1>Register</h1>
						<div className="input-container">
							<label htmlFor="username">username:</label>
							<input
								name="username"
								type="text"
								value={username}
								onChange={(event) =>
									setUsername(event.target.value)
								}
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
							<label htmlFor="passwordconfirm">
								confirm password:
							</label>
							<input
								name="passwordconfirm"
								type="password"
								value={confirmPassword}
								onChange={(event) => {
									setConfirmPassword(event.target.value);
								}}
							/>
						</div>
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
