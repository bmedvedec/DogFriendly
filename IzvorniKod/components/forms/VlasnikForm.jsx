import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/VlasnikForm.module.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useMyHooks } from "../../lib/hooks";

export default function PrivatnaForm(params) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyOIB, setCompanyOIB] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [companyDesc, setCompanyDesc] = useState("");
	const [companyType, setCompanyType] = useState("");

	// personal info
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	// company info
	const [companyNameError, setCompanyNameError] = useState("");
	// const [companyAddressError, setCompanyAddressError] = useState("");
	const [companyOIBError, setCompanyOIBError] = useState("");
	const [companyPhoneError, setCompanyPhoneError] = useState("");

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
			!loading &&
			!passwordError &&
			companyName &&
			companyAddress &&
			companyOIB &&
			companyPhone &&
			!companyNameError &&
			!companyOIBError &&
			!companyPhoneError
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [
		username,
		password,
		email,
		usernameExists,
		loading,
		companyName,
		companyAddress,
		companyOIB,
		companyPhone,
		companyType,
	]);

	const { firebaseCreateCompanyOwner } = useAuth();
	const { checkPasswordBlacklist } = useMyHooks();
	const router = useRouter();

	function handleSubmit(event) {
		event.preventDefault();

		firebaseCreateCompanyOwner(
			username,
			email,
			password,
			companyName,
			companyAddress,
			companyOIB,
			companyPhone,
			companyDesc,
			companyType
		)
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

	const checkCompanyName = useCallback(
		debounce(async (companyName) => {
			setLoading(true);
			const companiesRef = collection(db, "companies");
			const companiesSnap = await getDocs(companiesRef);

			if (companyName.length < 3) {
				setCompanyNameError(
					"Company name must be at least 3 characters"
				);
				setLoading(false);
			} else if (!isNaN(companyName)) {
				setCompanyNameError("Company name cannot be all numbers");
				setLoading(false);
			} else {
				setCompanyNameError("");
			}

			companiesSnap.forEach((doc) => {
				if (doc.data().name === companyName) {
					setCompanyNameError("Company name already exists");
					setLoading(false);
				}
			});

			setLoading(false);
		}, 500),
		[]
	);

	const checkCompanyOIB = useCallback(
		debounce(async (companyOIB) => {
			setLoading(true);

			if (isNaN(companyOIB)) {
				setCompanyOIBError("OIB must be all numbers");
				setLoading(false);
			} else if (companyOIB.length !== 11) {
				setCompanyOIBError("OIB must be 11 digits long");
				setLoading(false);
			} else {
				setCompanyOIBError("");
				setLoading(false);
			}
		}, 500),
		[]
	);

	const checkCompanyPhone = useCallback(
		debounce(async (companyPhone) => {
			setLoading(true);
			var phoneno =
				/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

			if (companyPhone.match(phoneno)) {
				setCompanyPhoneError("");
				setLoading(false);
			} else {
				setCompanyPhoneError("Phone not good!");
				setLoading(false);
			}
		}, 500),
		[]
	);

	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"& .MuiInputBase-input": {
			borderRadius: 32,
			position: "relative",
			backgroundColor: "white",
			border: "2px solid #d9d9d9",
			fontSize: "1.2rem",
			padding: "8px 16px",
			transition: theme.transitions.create([
				"border-color",
				"box-shadow",
			]),
			fontFamily: "Source Sans Pro",
			transition: "all 0.2s ease-in-out",
			"&:focus": {
				borderRadius: 32,
				border: "2px solid black",
				transition: "all 0.2s ease-in-out",
			},
		},
	}));

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className={styles.regFormTop}>
				<div className={styles.info}>
					<label className={styles.titles}>Personal info</label>
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
								setEmail(event.target.value);
								setLoading(true);
							}}
						/>
						{emailExists && (
							<p className="error">Email already exists</p>
						)}
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
						{passwordError && (
							<p className="error">{passwordError}</p>
						)}
					</div>
				</div>
				<div className={styles.info}>
					<label className={styles.titles}>Company info</label>
					<div className="input-container">
						<input
							name="companyName"
							type="text"
							value={companyName}
							placeholder="company name"
							onChange={(event) => {
								setLoading(true);
								setCompanyName(event.target.value);
								checkCompanyName(event.target.value);
							}}
						/>
						{companyNameError && (
							<p className="error">{companyNameError}</p>
						)}
					</div>
					<div className="input-container">
						<input
							name="companyAddress"
							type="text"
							value={companyAddress}
							placeholder="company address"
							onChange={(event) =>
								setCompanyAddress(event.target.value)
							}
						/>
					</div>
					<div className="input-container">
						<input
							name="companyOIB"
							type="number"
							value={companyOIB}
							placeholder="company OIB"
							onChange={(event) => {
								setLoading(true);
								setCompanyOIB(event.target.value);
								checkCompanyOIB(event.target.value);
							}}
						/>
						{companyOIBError && (
							<p className="error">{companyOIBError}</p>
						)}
					</div>
					<div className="input-container">
						<input
							name="companyPhone"
							type="tel"
							value={companyPhone}
							placeholder="contact number"
							onChange={(event) => {
								setLoading(true);
								setCompanyPhone(event.target.value);
								checkCompanyPhone(event.target.value);
							}}
						/>
						{companyPhoneError && (
							<p className="error">{companyPhoneError}</p>
						)}
					</div>
					<div className="input-container">
						<input
							name="companyDesc"
							type="text"
							value={companyDesc}
							placeholder="description"
							onChange={(event) =>
								setCompanyDesc(event.target.value)
							}
						/>
					</div>
					<div className="input-container">
						<FormControl>
							<Select
								displayEmpty
								value={companyType}
								onChange={(event) => {
									// setLoading(true);
									setCompanyType(event.target.value);
								}}
								input={<BootstrapInput />}
								inputProps={{ "aria-label": "Without label" }}
							>
								<MenuItem disabled value="">
									<em>type of business</em>
								</MenuItem>
								{companyTypes.map((type) => (
									<MenuItem key={type} value={type}>
										{type}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
