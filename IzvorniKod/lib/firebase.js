import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getFirestore,
	setDoc,
	writeBatch,
} from "firebase/firestore";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";

// konfiguracija za firebase, copy/paste iz firebase konzole
const firebaseConfig = {
	apiKey: "AIzaSyDwMl6K77eBRbb6s876n50kjRc_xIp4pDY",
	authDomain: "dogfriendly-progi.firebaseapp.com",
	projectId: "dogfriendly-progi",
	storageBucket: "dogfriendly-progi.appspot.com",
	messagingSenderId: "775486989290",
	appId: "1:775486989290:web:b20befe287cbbaab538893",
	measurementId: "G-ZL0FDW0P45",
};

// inicijalizacija firebase-a
const app = initializeApp(firebaseConfig);

// inicializacija firestore-a i dohvat reference na servis
export const db = getFirestore(app);

// dohvat servia za autentikaciju
export const auth = getAuth(app);

// formatiranje podataka o autentificiranom korisnikom - miču se sva nepotrebna polja
const formatAuthUser = (user) => ({
	uid: user.uid,
	email: user.email,
	verified: user.emailVerified,
});

// hook koji vraća podatke o autentificiranom korisniku i funkcije za autentifikaciju
export function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const authStateChanged = async (authState) => {
		if (!authState) { // ukoliko authState nije definiran, nema usera pa treba očistiti podatke o korisniku i javiti aplikaciji da je učitavanje gotovo
			setAuthUser(null);
			setLoading(false);
			return;
		}

		setLoading(true); 
		console.log("prije formattedUser", authState);
		var formattedUser = formatAuthUser(authState); // formatiranje podataka o korisniku - micanje nepotrebnih polja
		setAuthUser(formattedUser);
		setLoading(false);
	};

	const clear = () => { // ciscenje podataka o korisniku
		setAuthUser(null);
		setLoading(true);
	};

	const firebaseEmailPassSignIn = async (email, password) => { // poziva firebase funkciju te vraća error ukoliko se dogodi koji se hvata u funkciji roditelj u svrhu obrade
		return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
			// Signed in
			console.log("signed in");
		})
	};

	const firebaseCreateUserEmailPass = async (username, email, password) => { // funkcija za stvaranje običnog korisnika 
		createUserWithEmailAndPassword(auth, email, password).then( // poziva firebase funkciju i ako je korisnik uspješno kreiran, dohvaća njegov id i upisuje ga u firestore (bazu podataka) s dolje navedenim parametrima
			async (userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log("registered", user.uid);
				try {
					console.log("setting doc");
					await setDoc(doc(db, "users", user.uid), {
						username: username,
						email: email,
						companyOwner: false,
					});
				} catch (e) {
					console.error("Error adding document: ", e);
				}
				await sendEmailVerification(user);
			}
		);
	};

	const firebaseCreateCompanyOwner = async ( // funkcija za stvaranje vlasnika obrtnika
		username,
		email,
		password,
		companyName,
		companyAddress,
		companyOIB,
		companyPhone,
		companyDesc,
		companyType
	) => {
		createUserWithEmailAndPassword(auth, email, password).then( // poziva firebase funkciju i ako je uspješna upisuje korisnika u bazu (kao fja iznad) te upisuje i podatke o obrtu u bazu 
			async (userCredential) => {
				var user = userCredential.user;
				console.log("registered", user.uid);

				const batch = writeBatch(db);
				const userRef = doc(db, "users", user.uid);
				batch.set(userRef, {
					username: username,
					email: email,
					companyOwner: true,
				});
				const companyRef = doc(collection(db, "companies"));
				batch.set(companyRef, {
					owner: user.uid,
					name: companyName,
					address: companyAddress,
					oib: companyOIB,
					phone: companyPhone,
					description: companyDesc,
					type: companyType,
				});

				await batch.commit();
			}
		);
	};

	const firebaseSignOut = async () => { // prekida sjednicu korisnika
		signOut(auth).then(clear);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	return { // vraća podatke o korisniku, učitavanju i fjama aplikaciji
		authUser,
		loading,
		firebaseEmailPassSignIn,
		firebaseCreateUserEmailPass,
		firebaseCreateCompanyOwner,
		firebaseSignOut,
	};
}
