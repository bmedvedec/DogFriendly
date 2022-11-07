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
				<div className="card">
					<h1>Register</h1>
					<styles className={styles.registerChoiceContainer}>
						<div
							className={`tabButton ${
								privatna ? "tabButtonSelected" : ""
							}`}
							onClick={() => {
								setPrivatna(true);
								setVlasnik(false);
							}}
						>
							Privatna osoba
						</div>
						<div
							className={`tabButton ${
								vlasnik ? "tabButtonSelected" : ""
							}`}
							onClick={() => {
								setPrivatna(false);
								setVlasnik(true);
							}}
						>
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
