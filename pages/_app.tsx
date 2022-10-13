import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<NextProgress />
		</>
	);
}

export default MyApp;
