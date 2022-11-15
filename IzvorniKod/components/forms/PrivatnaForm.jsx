import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/PrivatnaForm.module.scss";
import { PaymentInputsWrapper } from "react-payment-inputs";
import usePaymentInputs from "react-payment-inputs/lib/usePaymentInputs";
import images from "react-payment-inputs/images";
import { css } from "styled-components";

export default function PrivatnaForm(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);

	const {
		wrapperProps,
		getCardImageProps,
		getCardNumberProps,
		getExpiryDateProps,
		getCVCProps,
	} = usePaymentInputs();

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
			<div className="input-container">
				<input
					name="username"
					type="text"
					value={username}
					placeholder="Username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div className="input-container">
				<input
					name="email"
					type="email"
					value={email}
					placeholder="Email"
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
					placeholder="Password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>
			<PaymentInputsWrapper
				styles={{
					input: {
						base: css`
							font-family: "Source Sans Pro";
							font-size: 1.2rem;
						`,
					},

					inputWrapper: {
						base: css`
							border-radius: 32px;
						`,
					},

					errorText: {
						base: css`
							font-size: 1rem;
						`,
					},
				}}
				{...wrapperProps}
			>
				<svg {...getCardImageProps({ images })} />
				<input {...getCardNumberProps()} />
				<input {...getExpiryDateProps()} />
				<input {...getCVCProps()} />
			</PaymentInputsWrapper>
			<input
				className={styles.button}
				type="submit"
				value="Sign Up"
				disabled={disabled}
			/>
		</form>
	);
}
