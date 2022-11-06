import Head from "next/head";
// import Header from "./header";
// import Footer from "./footer";
import styles from "../styles/layout.module.css";

export default function Layout({ children, page }) {
	

	return (
		<div styles={{ height: "100%" }}>
			<Head>
				<title>
					{page === "index"
						? "Dog Friendly"
						: "Dog Friendly - " + page}
				</title>
				<meta
					name="description"
					content="Dog Friendly, a website for dog owners and dog lovers."
				/>
				{/* generics */}
				<link rel="icon" href="/corgi.png" sizes="32x32" />
				<link rel="icon" href="/corgi.png" sizes="128x128" />
				<link rel="icon" href="/corgi.png" sizes="180x180" />
				<link rel="icon" href="/corgi.png" sizes="192x192" />
				{/* iOS */}
				<link
					rel="apple-touch-icon"
					href="/corgi.png"
					sizes="180x180"
				/>
				{/* Android */}
				<link rel="shortcut icon" href="/corgi.png" sizes="192x192" />
			</Head>
			{/* <Header /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</div>
	);
}
