import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/context";
import debounce from "lodash.debounce";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/VlasnikForm.module.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useMyHooks } from "../../lib/hooks";
import { PaymentInputsContainer, usePaymentInputs, wrapperProps } from "react-payment-inputs";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { purple } from "@mui/material/colors";
import { autocompleteClasses } from "@mui/material";

// Komponenta za prikaz forme za unos podataka o vlasniku
export default function VlasnikForm(params) {
	// inicijalizacija state hooke-ova za prikaz podataka o vlasniku i tvrtki
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

	// inicijalizacija state hooke-ova za prikaz poruke o grešci prilikom unosa podataka o vlasniku
	// personal info
	const [usernameExists, setUsernameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	// inicijalizacija state hook-ova za prikaz poruke o grešci prilikom unosa podataka o tvrtki
	// company info
	const [companyNameError, setCompanyNameError] = useState("");
	// const [companyAddressError, setCompanyAddressError] = useState("");
	const [companyOIBError, setCompanyOIBError] = useState("");
	const [companyPhoneError, setCompanyPhoneError] = useState("");
	const [companyDescError, setCompanyDescError] = useState("");

	// inicijalizacija state hook-ova za prikaz podataka o kartici
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [companyNamePay, setCompanyNamePay] = useState("");
	const [companyOIBPay, setCompanyOIBPay] = useState("");
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [VAT, setVAT] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cardExpiryDate, setCardExpiryDate] = useState("");
	const [cardCVC, setCardCVC] = useState("");

	// polje svih tipova tvrtki/obrta
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

	const [checked, setChecked] = useState(false);

	// hook koji se poziva na promjenu nekog od navedenih inputa, ako jedan input nije unutar zadovoljavajucih parametara, onemogucava se submit forme
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
			companyDesc &&
			!companyNameError &&
			!companyOIBError &&
			!companyPhoneError &&
			!companyDescError
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
		companyDesc,
		companyType,
	]);

	// inicijalizacija hook-a za kreiranje novog vlasnika tvrtke i provjeru password-a
	const { firebaseCreateCompanyOwner } = useAuth();
	const { checkPasswordBlacklist } = useMyHooks();
	const router = useRouter();

	// funkcija koja se poziva prilikom submita forme
	function handleSubmit(event) {
		event.preventDefault(); // sprijecava ponovno ucitavanje stranice

		//
		let date = new Date();
		// add 1 month to current date
		date.setMonth(date.getMonth() + 1);

		// convert javascript date to firebase timestamp
		let timestamp = Timestamp.fromDate(date);

		// funkcija koja kreira novog vlasnika tvrtke
		firebaseCreateCompanyOwner(
			username,
			email,
			timestamp,
			password,
			companyName,
			companyAddress,
			companyOIB,
			companyPhone,
			companyDesc,
			companyType,
			firstName,
			lastName,
			companyNamePay,
			companyOIBPay,
			address,
			country,
			region,
			city,
			zipCode,
			VAT,
			cardNumber,
			cardExpiryDate,
			cardCVC
		)
			.then(async (authUser) => {
				// ako je kreiranje vlasnika tvrtke uspjesno, vlasnik se preusmjerava na stranicu za prijavu
				router.push("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	}

	// funkcija koja se poziva prilikom promjene inputa za username ili email
	// te poziva funkciju za provjeru postojanja username-a ili email-a
	useEffect(() => {
		checkUsernameAndEmail(username, email);
	}, [username, email]);

	// funkcija za provjeru postojanja username-a ili email-a
	const checkUsernameAndEmail = useCallback(
		debounce(async (username, email) => {
			setUsernameExists(false);
			setEmailExists(false);
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) => {
				if (doc.data().username === username) {
					// ako postoji username, postavlja se state hook za prikaz poruke o grešci
					console.log("username exists");
					setUsernameExists(true);
				}
				if (doc.data().email === email) {
					// ako postoji email, postavlja se state hook za prikaz poruke o grešci
					console.log("email exists");
					setEmailExists(true);
				}
			});
			setLoading(false);
		}, 250),
		[]
	);

	// funkcija za provjeru ispravnosti password-a
	// password mora biti duzi od 8 znakova i ne smije biti blacklist-an
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

	// funkcija za provjeru ispravnosti naziva tvrtke
	// naziv tvrtke mora biti duzi od 3 znaka, ne smiju biti svi brojevi i ne smije vec postojat u bazi
	const checkCompanyName = useCallback(
		debounce(async (companyName) => {
			setLoading(true);
			const companiesRef = collection(db, "companies"); // referenca na kolekciju tvrtki
			const companiesSnap = await getDocs(companiesRef); // dohvaca kolekciju companies iz baze

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

	// funkcija za provjeru ispravnosti OIB-a tvrtke
	// OIB mora imati tocno 11 brojeva
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

	// funkcija za provjeru ispravnosti kontakta tvrtke/obrta
	const checkCompanyPhone = useCallback(
		debounce(async (companyPhone) => {
			setLoading(true);
			var phoneno =
				/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

			if (companyPhone.match(phoneno)) {
				setCompanyPhoneError("");
				setLoading(false);
			} else {
				setCompanyPhoneError("Invalid phone number!");
				setLoading(false);
			}
		}, 500),
		[]
	);

	// funkcija za provjeru jel upisano barem 30 znakova za opis tvrtke/obrta
	const checkCompanyDesc = useCallback(
		debounce(async (companyDesc) => {
			setLoading(true);
			if (companyDesc.length < 30) {
				setCompanyDescError(
					"Description must be at least 30 characters"
				);
				setLoading(false);
			} else {
				setCompanyDescError("");
				setLoading(false);
			}
		}, 500),
		[]
	);

	// funkcija koja se koristi u select inputu za tip tvrtke (stil)
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

	const {
		wrapperProps,
		getCardNumberProps,
		getExpiryDateProps,
		getCVCProps,
	} = usePaymentInputs();

	function addUserInfo() {
		if (!checked) {
			setChecked(true);
			setCompanyNamePay(companyName);
			setCompanyOIBPay(companyOIB);
			setAddress(companyAddress);
		} else {
			setChecked(false);
			setCompanyNamePay("");
			setCompanyOIBPay("");
			setAddress("");
		}
	}

	const UserInfoSwitch = styled(Switch)(({ theme }) => ({
		"& .MuiSwitch-switchBase.Mui-checked": {
			color: purple[600],
			"&:hover": {
				backgroundColor: alpha(
					purple[600],
					theme.palette.action.hoverOpacity
				),
			},
		},
		"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
			backgroundColor: purple[600],
		},
	}));

	const label = { inputProps: { "aria-label": "Color switch demo" } };

	// kod za prikaz vlasnik forme
	return (
		<form
			className="form"
			onSubmit={handleSubmit}>
			<div className={styles.container}>
				<div className={styles.personInfo}>
					{/* personal info tab */}
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
							{/* prikaz greske ispod inputa ako je state postavljen na true */}
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
									// svaki put kada se promijeni vrijednost password-a, pozovi funkciju checkPassword
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

					{/* company info tab */}
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
								onChange={(event) => {
									setLoading(true);
									setCompanyDesc(event.target.value);
									checkCompanyDesc(event.target.value);
								}}
							/>
							{companyDescError && (
								<p className="error">{companyDescError}</p>
							)}
						</div>
						{/* custom select forma za odabir tipa tvrtke/obrta */}
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
									inputProps={{
										"aria-label": "Without label",
									}}>
									<MenuItem
										disabled
										value="">
										<em>type of business</em>
									</MenuItem>
									{companyTypes.map((type) => (
										<MenuItem
											key={type}
											value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</div>
				</div>

				{/* payment info tab */}
				<div className={styles.payInfoTab}>
					<label
						className={styles.titles}
						style={{ display: "inline-block", width: "100%" }}>
						Payment info
					</label>

					<div className={styles.payInfo}>
						<div className={styles.info}>
							<div className="input-container">
								<input
									name="firstName"
									type="text"
									placeholder="First name"
									value={firstName}
									required
									onChange={(event) => {
										setFirstName(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="lastName"
									type="text"
									placeholder="Last name"
									value={lastName}
									required
									onChange={(event) => {
										setLastName(event.target.value);
									}}
								/>
							</div>
							<PaymentInputsContainer>
								{({
									getCardNumberProps,
									getExpiryDateProps,
									getCVCProps,
								}) => (
									<>
										<div className="input-container">
											<input
												{...getCardNumberProps({
													value: cardNumber,
													onChange: (e) =>
														setCardNumber(
															e.target.value
														),
												})}
											/>
										</div>
										<div className={styles.dateCvc}>
											<input
												className={styles.expiryDate}
												{...getExpiryDateProps({
													value: cardExpiryDate,
													onChange: (e) =>
														setCardExpiryDate(
															e.target.value
														),
												})}
											/>
											<input
												className={styles.cvc}
												{...getCVCProps({
													value: cardCVC,
													onChange: (e) =>
														setCardCVC(e.target.value),
												})}
											/>
										</div>
									</>
								)}
							</PaymentInputsContainer>
							<div className="input-container">
								<input
									name="city"
									type="text"
									placeholder="City"
									value={city}
									required
									onChange={(event) => {
										setCity(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="zip"
									type="text"
									placeholder="ZIP"
									value={zipCode}
									required
									onChange={(event) => {
										setZipCode(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className={styles.info}>
							<div className="input-container">
								<input
									name="companyName"
									type="text"
									placeholder="Company name"
									value={companyNamePay}
									required
									onChange={(event) => {
										setCompanyNamePay(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="companyOIB"
									type="text"
									placeholder="Company OIB"
									value={companyOIBPay}
									required
									onChange={(event) => {
										setCompanyOIBPay(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="address"
									type="text"
									placeholder="Address"
									value={address}
									required
									onChange={(event) => {
										setAddress(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="country"
									type="text"
									placeholder="Country"
									value={country}
									required
									onChange={(event) => {
										setCountry(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="region"
									type="text"
									placeholder="Region/State"
									value={region}
									onChange={(event) => {
										setRegion(event.target.value);
									}}
								/>
							</div>
							<div className="input-container">
								<input
									name="VAT"
									type="number"
									placeholder="VAT"
									value={VAT}
									required
									onChange={(event) => {
										setVAT(event.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<FormControlLabel
					{...label}
					control={
						<UserInfoSwitch
							checked={checked}
							onChange={addUserInfo}
						/>
					}
					label="use User Info"
					labelPlacement="end"
				/>
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
