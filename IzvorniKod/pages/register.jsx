import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/register.module.scss";
import PrivatnaForm from "../components/forms/PrivatnaForm";
import VlasnikForm from "../components/forms/VlasnikForm";

export default function Register(params) {
	const [privatna, setPrivatna] = useState(false);
	const [vlasnik, setVlasnik] = useState(false);

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

					{/* <div className={styles.dogContainer}> */}
						<img
							src="/chihuahua.png"
							alt="dog"
							className={styles.dog}
						/>
						<p>
							<b>Discover</b> new places with your furry best friend.
						</p>
					{/* </div> */}
				</div>

				<div className={styles.rightSide}>
					<div className={styles.login}>
						<p>
							Already have an account?{" "}
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

					<styles className={styles.registerChoiceContainer}>
						<div
							className={`tabButton ${privatna ? "tabButtonSelected" : ""}`}
							onClick={() => {
								setPrivatna(true);
								setVlasnik(false);
							}}>
							Privatna osoba
						</div>
						<div
							className={`tabButton ${vlasnik ? "tabButtonSelected" : ""}`}
							onClick={() => {
								setPrivatna(false);
								setVlasnik(true);
							}}>
							Vlasnik obrta
						</div>
					</styles>
					{privatna && <PrivatnaForm />}
					{vlasnik && <VlasnikForm />}
				</div>
			</div>
		</Layout>
	);
}
