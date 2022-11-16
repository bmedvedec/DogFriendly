import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/register.module.scss";
import PrivatnaForm from "../components/forms/PrivatnaForm";
import VlasnikForm from "../components/forms/VlasnikForm";
import { useRouter } from "next/router";
import { useAuth } from "../lib/context";

// funkcija za registraciju koja prima parametre email i password u sklopu params objekta
export default function Register(params) {
	// inicijalizacija hook state-a za forme privatna i vlasnik
	// ako je privatna true, prikazuje se PrivatnaForm, inace VlasnikForm
	// privatna je default true
	const router = useRouter();
	const { authUser } = useAuth();
	if(authUser) {
		router.push("/userInfo");
		return 
	}

	const [privatna, setPrivatna] = useState(true);
	const [vlasnik, setVlasnik] = useState(false);

	// kod za prikaz register stranice
	return (
		<Layout page="Register">
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<div className={styles.appName}>
						<a href="/">
							<p>
								<b>Dog Friendly</b>
							</p>
						</a>
					</div>

						<img
							src="/chihuahua.png"
							alt="dog"
							className={styles.dog}
						/>
						<p className={styles.heroText}>
							<b>Discover</b> new places with your furry best friend.
						</p>
				</div>

				<div className={styles.rightSide}>
					<div className={styles.login}>
						<p>
							<span className={styles.already}>Already have an account?</span>{" "}
							<a
								href="/login"
								className={styles.link}>
								Login
							</a>
						</p>
					</div>

					<div className={styles.heading}>
						<h1 className={styles.headingWelcome}>Welcome To Dog Friendly</h1>
						<h2 className={styles.headingRegister}>Register</h2>
					</div>

					{/* div sa dva tabButtona za odabir privatne ili vlasnik forme */}
					<div className={styles.registerChoiceContainer}>
						<div
							className={`tabButton tabButton-personal ${privatna ? "tabButtonSelected" : ""}`}
							onClick={() => {
								setPrivatna(true);
								setVlasnik(false);
							}}>
							Personal
						</div>
						<div
							className={`tabButton tabButton-company ${vlasnik ? "tabButtonSelected" : ""}`}
							onClick={() => {
								setPrivatna(false);
								setVlasnik(true);
							}}>
							Company
						</div>
					</div>
					{/* prikaz jedne od formi u zavisnosti od state-a privatna i vlasnik */}
					{privatna && <PrivatnaForm />}
					{vlasnik && <VlasnikForm />}
				</div>
			</div>
		</Layout>
	);
}
