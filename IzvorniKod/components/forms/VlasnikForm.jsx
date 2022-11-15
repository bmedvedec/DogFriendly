import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/VlasnikForm.module.scss";
import { css } from "styled-components";

export default function PrivatnaForm(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyOIB, setCompanyOIB] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [companyDesc, setCompanyDesc] = useState("");
	const [companyType, setCompanyType] = useState("");

	const companyTypes = [
		"park",
		"beach",
		"store",
		"caffe",
		"restaurant",
		"veterinary clicnic",
		"beauty salon",
	];

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (
			username &&
			password &&
			email &&
			!usernameExists &&
			!emailExists &&
			!loading
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [username, password, email, usernameExists, loading]);

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
		}, 250),
		[]
	);

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className={styles.regFormTop}>
				<div>
					<label>Personal info</label>
					<div className="input-container">
						<input
							name="username"
							type="text"
							value={username}
							placeholder="username"
							onChange={(event) => setUsername(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<input
							name="email"
							type="email"
							value={email}
							placeholder="email"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</div>
					<div className="input-container">
						<input
							name="password"
							type="password"
							value={password}
							placeholder="password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</div>
				
				</div>
				<div>
					<label>Company info</label>
					<div className="input-container">
						<input
							name="companyName"
							type="text"
							value={companyName}
							placeholder="company name"
							onChange={(event) => setCompanyName(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<input
							name="companyAddress"
							type="text"
							value={companyAddress}
							placeholder="company address"
							onChange={(event) => setCompanyAddress(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<input
							name="companyOIB"
							type="number"
							value={companyOIB}
							placeholder="company OIB"
							onChange={(event) => setCompanyOIB(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<input
							name="companyPhone"
							type="tel"
							value={companyPhone}
							placeholder="contact number"
							onChange={(event) => setCompanyPhone(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<input
							name="companyDesc"
							type="text"
							value={companyDesc}
							placeholder="description"
							onChange={(event) => setCompanyDesc(event.target.value)}
						/>
					</div>
					<div className="input-container">
						<select className={styles.dropDown}
							name="companyType"
							value={companyType}
							onChange={(event) => setCompanyType(event.target.value)}
						>
							<option hidden className={styles.holder}>type of business</option>
							{companyTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
				</div>
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
