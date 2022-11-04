import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/register.module.scss";
import { useAuth } from "../lib/context";
import { useRouter } from "next/router";

export default function Register(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { firebaseCreateUserEmailPass } = useAuth();
	const router = useRouter();

	function handleSubmit(event) {
		event.preventDefault();

		firebaseCreateUserEmailPass(email, password)
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
		<Layout page="Register">
			<div className={styles.container}>
				<form onSubmit={handleSubmit}>
					<div className="card">
						<h1>Register</h1>
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
