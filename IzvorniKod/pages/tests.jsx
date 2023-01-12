import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styles from "../styles/Test.module.scss";

const firebaseConfig = {
	apiKey: "AIzaSyDwMl6K77eBRbb6s876n50kjRc_xIp4pDY",
	authDomain: "dogfriendly-progi.firebaseapp.com",
	projectId: "dogfriendly-progi",
	storageBucket: "dogfriendly-progi.appspot.com",
	messagingSenderId: "775486989290",
	appId: "1:775486989290:web:b20befe287cbbaab538893",
	measurementId: "G-ZL0FDW0P45",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export default function Test() {
	const checkDatabaseRead = () => {
		console.clear();
		console.log("Creating document reference... ♻️");
		const docRef = doc(db, "dummyData", "WRbnbMZZwSEO4N3klm82");
		if (docRef) {
			console.log("Document reference is valid ✅");
		} else {
			console.log("Document reference is invalid ❌");
		}
		console.log("Getting document... ♻️");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists()) {
					console.log("Successfully got document ✅");
					console.log("Document data:", doc.data());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document! ❌");
				}
			})
			.catch((error) => {
				console.log("Error getting document ❌");
				console.log("Error getting document:", error);
			});
	};

	const checkDatabaseWrite = () => {
		console.clear();
		console.log("DATA BEFORE WRITE");
		getDocs(collection(db, "dummyData"))
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(`${doc.id} => `, doc.data());
				});

				console.log("####################");
				console.log("DATA TO WRITE");
				const data = {
					username: "test",
					email: "test@testing.com",
					companyOwner: true,
				};
				console.log(data);

				console.log("####################");
				console.log("WRITING DATA");
				addDoc(collection(db, "dummyData"), data)
					.then((docRef) => {
						console.log("Document written with ID: ", docRef.id);
						console.log("####################");
						console.log("DATA AFTER WRITE");
						getDocs(collection(db, "dummyData")).then(
							(querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(`${doc.id} => `, doc.data());
								});
							}
						);
					})
					.catch((error) => {
						console.error("Error adding document: ", error);
					});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

    const checkAuthenticationRegistration = () => {
        console.clear();
        console.log("Creating user... ♻️");
        const email = "testing@testing.com"
        const password = "test12341234"
        console.log("Email: " + email);
        console.log("Password: " + password);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Successfully created user ✅");
            console.log("User: ", user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error creating user ❌");
            console.log("Error code: " + errorCode);
            console.log("Error message: " + errorMessage);
            // ..
        });
    }

    const checkAuthenticationLogin = () => {
        console.clear();
        console.log("Logging in... ♻️");
        const email = "testing@testing.com";
        const password = "test12341234"
        console.log("Email: " + email);
        console.log("Password: " + password);

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Successfully logged in ✅");
            console.log("User: ", user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error logging in ❌");
            console.log("Error code: " + errorCode);
            console.log("Error message: " + errorMessage);
        });
    }
        

	return (
		<main className={styles.main}>
			<h1>Tests</h1>
			<div>
				<h2>
					Check database read{" "}
					<button onClick={checkDatabaseRead}>test</button>
				</h2>
			</div>
			<div>
				<h2>
					Check database write{" "}
					<button onClick={checkDatabaseWrite}>test</button>
				</h2>
			</div>
            <div>
                <h2>
                    Check authentication registration{" "}
                    <button onClick={checkAuthenticationRegistration}>test</button>
                </h2>
            </div>
            <div>
                <h2>
                    Check authentication login{" "}
                    <button onClick={checkAuthenticationLogin}>test</button>
                </h2>
            </div>
		</main>
	);
}
