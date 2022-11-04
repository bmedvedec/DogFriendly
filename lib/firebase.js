// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDwMl6K77eBRbb6s876n50kjRc_xIp4pDY",
	authDomain: "dogfriendly-progi.firebaseapp.com",
	projectId: "dogfriendly-progi",
	storageBucket: "dogfriendly-progi.appspot.com",
	messagingSenderId: "775486989290",
	appId: "1:775486989290:web:b20befe287cbbaab538893",
	measurementId: "G-ZL0FDW0P45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const formatAuthUser = (user) => ({
	uid: user.uid,
	email: user.email,
})

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
		var formattedUser = formatAuthUser(authState);
		setAuthUser(formattedUser);
		setLoading(false);
	}

	const clear = () => {
		setAuthUser(null);
		setLoading(true);
	}

	const firebaseEmailPassSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
	}

	const firebaseCreateUserEmailPass = async (email, password) => {
		createUserWithEmailAndPassword(auth, email, password);
	}

	const firebaseSignOut = async () => {
		signOut(auth).then(clear);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	return { authUser, loading, firebaseEmailPassSignIn, firebaseCreateUserEmailPass, firebaseSignOut };
}