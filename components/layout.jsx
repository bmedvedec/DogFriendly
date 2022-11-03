import Head from "next/head";
// import Header from "./header";
// import Footer from "./footer";
import styles from "../styles/layout.module.css";

export default function Layout({ children, page }) {
	return (
		<>
			<Head>
				<title>{page === 'index' ? 'Dog Friendly' : 'Dog Friendly - ' + page}</title>
				<meta
					name="description"
					content="Dog Friendly, a website for dog owners and dog lovers."
				/>
				{/* generics */}
				<link rel="icon" href="/favicon.svg" sizes="32x32" />
				<link rel="icon" href="/favicon.svg" sizes="128x128" />
				<link rel="icon" href="/favicon.svg" sizes="180x180" />
				<link rel="icon" href="/favicon.svg" sizes="192x192" />
				{/* iOS */}
				<link
					rel="apple-touch-icon"
					href="/favicon.svg"
					sizes="180x180"
				/>
				{/* Android */}
				<link
					rel="shortcut icon"
					href="/favicon.svg"
					sizes="192x192"
				/>
			</Head>
			{/* <Header /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
}
