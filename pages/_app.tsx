import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link
					rel="search"
					href="/opensearch.xml"
					type="application/opensearchdescription+xml"
					title="Search CPlusPatch Search"
				/>
			</Head>
			<Component {...pageProps} />
			<NextProgress />
		</>
	);
}

export default MyApp;
