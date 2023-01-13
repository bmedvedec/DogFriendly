import { AuthUserProvider } from "../lib/context";
import "../styles/globals.scss";
import "@fontsource/raleway"
import "@fontsource/source-sans-pro"

function MyApp({ Component, pageProps }) {
	return (
		<AuthUserProvider>
			<Component {...pageProps} />
		</AuthUserProvider>
	);
}

export default MyApp;
