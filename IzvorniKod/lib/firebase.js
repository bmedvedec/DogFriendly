import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc, writeBatch } from "firebase/firestore";
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
		if (!authState) {
			setAuthUser(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		console.log("prije formattedUser", authState);
		var formattedUser = formatAuthUser(authState);
		setAuthUser(formattedUser);
		setLoading(false);
	};

	const clear = () => {
		setAuthUser(null);
		setLoading(true);
	};

	const firebaseEmailPassSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
	};

	const firebaseCreateUserEmailPass = async (username, email, password) => {
		createUserWithEmailAndPassword(auth, email, password).then(
			async (userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log("registered", user.uid);
				try {
					console.log("setting doc");
					await setDoc(doc(db, "users", user.uid), {
						username: username,
						email: email,
					});
				} catch (e) {
					console.error("Error adding document: ", e);
				}
				await sendEmailVerification(user);
			}
		);
	};

	const firebaseCreateCompanyOwner = async (
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
		createUserWithEmailAndPassword(auth, email, password).then(
			async (userCredential) => {
				var user = userCredential.user;
				console.log("registered", user.uid);

				const batch = writeBatch(db);
				const userRef = doc(db, "users", user.uid);
				batch.set(userRef, { username: username, email: email });
				const companyRef = doc(collection(db, "companies"));
				batch.set(companyRef, {owner: user.uid, name: companyName, address: companyAddress, oib: companyOIB, phone: companyPhone, description: companyDesc, type: companyType});

				await batch.commit();
			}
		);
	};

	const firebaseSignOut = async () => {
		signOut(auth).then(clear);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	return {
		authUser,
		loading,
		firebaseEmailPassSignIn,
		firebaseCreateUserEmailPass,
		firebaseCreateCompanyOwner,
		firebaseSignOut,
	};
}
