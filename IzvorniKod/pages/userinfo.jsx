import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "../styles/userInfo.module.scss";
import Link from "next/link";



export async function getServerSideProps(context) {


	const locationsRef = collection(db, "locations");
	const locationsSnapshot = await getDocs(locationsRef);

	const initLocations = locationsSnapshot.docs.map((doc) => {
		const newItem = {};
		newItem.id = doc.id;
		Object.entries(doc.data()).forEach(([key, value]) => {
			if (key === "geopoint") {
				newItem[key] = {
					latitude: value.latitude,
					longitude: value.longitude,
				};
			} else {
				newItem[key] = value;
			}
		});
		return newItem;
	});
	console.log("lokacije " + initLocations);

	return {
		props: {
			initLocations,

		},
	};
}

export default function UserInfo({ initLocations }) {
	// sprema kontekst autentifikacije u authUser
	const { authUser, firebaseSignOut } = useAuth();
	// inicijalizacija hook state-a za podatke o korisniku, podatke o firmi i da li je korisnik vlasnik firme

	const [userInfo, setUserInfo] = useState(null);
	const [companyInfo, setCompanyInfo] = useState(null);
	const [userID, setUserID] = useState(null);

	const [personal, setPersonal] = useState(true);
	const [company, setCompany] = useState(false);

	// funkcija koja povlaci podatke o korisniku iz baze i ako je korisnik vlasnik firme, povlaci i podatke o firmi
	// poziva se na promjenu authUser-a
	useEffect(() => {
		async function getUserInfo() {
			const docRef = doc(db, "users", authUser.uid); // referenca na dokument korisnika
			const docSnap = await getDoc(docRef); // povlaci podatke o korisniku iz baze koji imaju id jednak authUser.uid
			if (docSnap.exists()) {
				// ako postoji dokument sa tim id-em
				setUserInfo(docSnap.data()); // sprema podatke o korisniku u hook state
				setUserID(docSnap.id);
				if (docSnap.data().companyOwner) {
					// ako je korisnik vlasnik firme
					const companyRef = collection(db, "companies"); // referenca na kolekciju firmi
					const companySnap = await getDocs(companyRef); // povlaci sve dokumente iz kolekcije firmi
					companySnap.forEach((doc) => {
						// prolazi kroz sve dokumente iz kolekcije firmi
						if (doc.data().owner === authUser.uid) {
							// ako je id vlasnika firme jednak authUser.uid
							setCompanyInfo(doc.data()); // sprema podatke o firmi u hook state
						}
					});
				}
			} else {
				console.log("No such document!");
			}
		}
		if (authUser) {
			getUserInfo();
		}
	}, [authUser, initLocations]);

	const deleteLocation = (id) => {
		const locationRef = doc(db, "locations", id);
		initLocations.filter((location) => location.id !== id);

		// after filter reload page
		deleteDoc(locationRef).then(() => {
			console.log("Document successfully deleted!");

			window.location.reload();

		}).catch((error) => {
			console.error("Error removing document: ", error);


		});





	};


	// prikaži izmjenjivu formu koja kao inicijalne vrijednosti ima podatke o korisniku
	// ako je korisnik vlasnik firme, prikaži i podatke o firmi

	return (
		<Layout>
			<div className={styles.container}>
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
					<div className={styles.center}>
						<div className={styles.myAccount}>
							<img src="/corgi.png" height="100vh" />
							<h1>My Account</h1>
						</div>
						<div className={styles.registerChoiceContainer}>
							<div
								className={`tabButton tabButton-personal ${personal ? "tabButtonSelected" : ""
									}`}
								onClick={() => {
									setPersonal(true);
									setCompany(false);
								}}
							>
								Personal information
							</div>
							{companyInfo && (<div
								className={`tabButton tabButton-company ${company ? "tabButtonSelected" : ""
									}`}
								onClick={() => {
									setPersonal(false);
									setCompany(true);
								}}
							>
								Company information
							</div>)}
						</div>

						{personal && userInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								username
							</span>
							<p className={styles.text}>
								{userInfo.username}
							</p>
						</div>)}
						{personal && userInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								email
							</span>
							<p className={styles.text}>
								{userInfo.email}
							</p>
						</div>)}

						{company && companyInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								name
							</span>
							<p className={styles.text}>
								{companyInfo.name}
							</p>
						</div>)}
						{company && companyInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								address
							</span>
							<p className={styles.text}>
								{companyInfo.address}
							</p>
						</div>)}
						{company && companyInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								description
							</span>
							<p className={styles.text}>
								{companyInfo.description}
							</p>
						</div>)}
						{company && companyInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								phone
							</span>
							<p className={styles.text}>
								{companyInfo.phone}
							</p>
						</div>)}
						{company && companyInfo && (<div className={styles.info}>
							<span className={styles.inputs}>
								type
							</span>
							<p className={styles.text}>
								{companyInfo.type}
							</p>
						</div>)}

						<br />

						{company && companyInfo && (
							<div className={styles.registerChoiceContainer}>
								<div className={"tabButton tabButton-personal tabButtonSelected"}>
									Payment info
								</div>
							</div>)
						}

						<div className={styles.paymentInfo}>
							<div className={styles.sides}>

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										first name
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.firstName}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										last name
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.lastName}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										card number
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.cardNumber}
									</p>
								</div>)}

								<div className={styles.mmCVC}>
									{company && companyInfo && (<div className={styles.info}>
										<span className={styles.inputs}>
											mm / yy
										</span>
										<p className={styles.text}>
											{userInfo.paymentInfo.cardExpiryDate}
										</p>
									</div>)}

									{company && companyInfo && (<div className={styles.info}>
										<span className={styles.inputs}>
											CVC
										</span>
										<p className={styles.text}>
											{userInfo.paymentInfo.cardCVC}
										</p>
									</div>)}
								</div>

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										city
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.city}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										zip code
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.zipCode}
									</p>
								</div>)}
							</div>

							<div className={styles.sides}>
								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										company name
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.companyNamePay}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										company OIB
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.companyOIBPay}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										VAT
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.VAT}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										address
									</span>
									<p className={styles.text}>
										{companyInfo.address}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										state/region
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.region}
									</p>
								</div>)}

								{company && companyInfo && (<div className={styles.info}>
									<span className={styles.inputs}>
										country
									</span>
									<p className={styles.text}>
										{userInfo.paymentInfo.country}
									</p>
								</div>)}
							</div>
						</div>


						{personal && initLocations && !companyInfo && (
							<div className={styles.registerChoiceContainer}>
								<div className={"tabButton tabButton-personal tabButtonSelected"}>
									Added locations
								</div>
							</div>)
						}

						{personal && initLocations && !companyInfo && (
							<div className={styles.locationsContainer}>

								{initLocations.map((location) => (

									(location.user === userID) &&

									<div className={styles.location}>

										<p>{location.name}</p>

										<button className={styles.button}
											onClick={() => {
												deleteLocation(location.id);
												initLocations.filter((location) => location.id !== location.id);
											}}><i>delete</i></button>

									</div>





								))}
							</div>
						)}

						<div className={styles.changeButtonsContainer}>
							{userInfo && <button className={styles.button}
								onClick={() => window.location.href = "/changeInfo"}><i>Change user info</i></button>}
							{userInfo && <button className={styles.button}
								onClick={() => window.location.href = "/changePassword"}><i>Change password</i></button>}
						</div>

					</div>
				</div>
			</div>
		</Layout>
	);

}
