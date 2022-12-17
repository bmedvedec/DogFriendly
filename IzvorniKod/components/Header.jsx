import { useAuth } from "../lib/context";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

export default function Header(params) {
	const { authUser, firebaseSignOut } = useAuth();

	return (
		<header className={styles.header}>
			<Link href="/"><span style={{fontWeight: "bold"}}>Dog Friendly</span></Link>
			{authUser ? (
				<div className={styles.right}>
					<div className={styles.accountInfo}>
						<img src="/corgiHeader.png" alt="corgi header Icon for user" />
						<Link href="/userinfo">Profile</Link>
					</div>
					<span onClick={firebaseSignOut}><i>Sign out</i></span>
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
	);
}
