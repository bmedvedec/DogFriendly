import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import PlacanjeForm from "../components/forms/PlacanjeForm";
import PersonalForm from "../components/forms/PersonalForm";
import CompanyForm from "../components/forms/CompanyForm";

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
	console.log(initLocations);

	return {
		props: {
			initLocations,
			
		},
	};
}

export default function UserInfo({ initLocations }) {
	// sprema kontekst autentifikacije u authUser
	const { authUser } = useAuth();
	// inicijalizacija hook state-a za podatke o korisniku, podatke o firmi i da li je korisnik vlasnik firme
	
	const [userInfo, setUserInfo] = useState(null);
	const [companyInfo, setCompanyInfo] = useState(null);
	const [userID, setUserID] = useState(null);

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
			<a href="/">Home page link</a>

			<h1>User info</h1>
			{userInfo && <p>{userInfo.username}</p>}
			{userInfo && <p>{userInfo.email}</p>}
			{companyInfo && <h1>Payment info</h1>}
			{companyInfo && <p>{userInfo.paymentInfo.firstName}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.lastName}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.companyNamePay}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.companyOIBPay}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.address}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.country}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.region}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.city}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.zipCode}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.VAT}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.cardNumber}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.cardExpiryDate}</p>}
			{companyInfo && <p>{userInfo.paymentInfo.cardCVC}</p>}

			<br />
			{companyInfo && (
				<p>
					<b>Company info</b>
				</p>
			)}
			{companyInfo && <p>{companyInfo.name}</p>}
			{companyInfo && <p>{companyInfo.address}</p>}
			{companyInfo && <p>{companyInfo.description}</p>}
			{companyInfo && <p>{companyInfo.phone}</p>}
			{companyInfo && <p>{companyInfo.type}</p>}
			{companyInfo && <p>{userInfo.dateOfExpiry.toDate().toString()}</p>}

			{initLocations.length > 0 && (
				<div>
					<h1>Locations</h1>
					{initLocations.map((location) => (

						(location.user === userID) &&

						<div>
							
							<p>{location.name}</p>

							<button onClick={() => {
								deleteLocation(location.id);
								initLocations.filter((location) => location.id !== location.id);
								}}>Delete location</button>
							
						</div>
						

						


					))}
				</div>
			)}


			{/* {userInfo && <h1>Personal Information</h1>}
			{userInfo && <PersonalForm props={userInfo} />	}

			<br />
			<br />

			{companyInfo && <h1>Company Information</h1>}
			{companyInfo && <CompanyForm props = {companyInfo} />}

			<br />
			<br />

			{companyInfo && <h1>Payment Information</h1>}
			{companyInfo && <PlacanjeForm props={userInfo.paymentInfo}/>} */}

			{userInfo && <button onClick={() => window.location.href = "/changeInfo"}>Change user info</button>}
			{userInfo && <button onClick={() => window.location.href = "/changePassword"}>Change password</button>}

			<br />
			<br />

		</Layout>
	);
	
}
