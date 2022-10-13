import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { SearxSearchResult } from "../types/types";
import { getSearchResults } from "../utils/searx";

const Search: NextPage = () => {
	const { q } = useRouter().query;
	const [results, setResults] = useState<SearxSearchResult>({});
	
	useEffect(() => {
		async function fn() {
			const results: SearxSearchResult = await getSearchResults(q!.toString());
			setResults(results);
		}
		if (window !== undefined && q && JSON.stringify(results) === "{}" ) {
			fn()
		}
	});

	const [suggestions, setSuggestions] = useState<string[]>([]);
	var onType = function (event: any) {
		const text = event.target.value;

		if (text !== "") {
			setSuggestions([
				"sugar free gluten recipes",
				"impostor among us",
				"donald trump free t-shirt",
			]);
		} else {
			setSuggestions([]);
		}
	};
	return (
		<div className="w-full h-full">
			<header className="flex items-center w-full h-20 p-5 border-b-2 border-b-gray-100">
				<span
					id="logo"
					className="mr-2 text-xl font-bold text-transparent font-inter bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text">
					Search
				</span>
				<div className="relative h-full w-96">
					<input
						type="text"
						className={`z-10 h-full w-full px-4 py-2 border-2 border-gray-200 rounded-md
							shadow-none outline-none ring-0 active:ring-0 ${
								JSON.stringify(suggestions) !== "[]"
									? "border-b-0 rounded-b-none"
									: ""
							}`}
						placeholder="Search"
						defaultValue={q}
						onChange={onType}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="absolute top-0 right-0 z-0 w-auto h-full p-3 duration-200 rounded-md hover:scale-110 hover:cursor-pointer">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>
			</header>
			{results && <ul></ul>}
		</div>
	);
};

export default Search;