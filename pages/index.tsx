import type { NextPage } from 'next';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';

const Home: NextPage = () => {
	return (
		<div className="w-full h-full">
			<Head>
				<title>Search &middot; CPlusPatch</title>
			</Head>
			<div className="flex justify-center w-full h-full">
				<div className="flex flex-col items-center justify-center h-full w-[30rem]">
					<span
						id="logo"
						className="text-6xl font-bold text-transparent font-inter bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text">
						Search
					</span>
					<SearchBar className="mt-10"/>
				</div>
			</div>
		</div>
	);
}

export default Home
