import { NextComponentType, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { Result, SearxSearchResult } from "../types/types";
import { getSearchResults, getSearchEngineIcon } from "../utils/searx";

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
			{results && (
				<ul className="px-16">
					{results.results?.map(result => (
						<SearchResult key={result.url} result={result}/>
					))}
				</ul>
			)}
		</div>
	);
};

	const SearchResult = ({ result }: {
		result: Result;
	}) => {
	return (
		<article className="w-2/5 px-1 py-4 m-10 bg-white border border-gray-300 rounded-md md:p-2 sm:py-4">
			<div role="presentation">
				<div>
					<div className="pl-12 md:pl-10 xs:pl-10">
						<h2 className="mb-2 text-2xl font-bold leading-7 hover:text-blue-600">
							<a href={result.url} id="article-link-151230">
								{result.title}
							</a>
						</h2>
						<div className="mb-2">
							<a
								href="/t/react"
								className="p-1 text-sm text-gray-600 hover:text-black">
								<span className="text-opacity-50">#</span>
								{result.category}
							</a>
						</div>
						<div className="mb-1 leading-6">{result.content}</div>
						<div className="flex items-center justify-between">
							<div className="flex">
								<a
									href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd"
									className="py-1 pl-1 pr-2 text-gray-600">
									{getSearchEngineIcon(
										result.engine,
										"inline fill-current w-4 h-4")}
									<span className="inline ml-2 capitalize">
										{result.engine}
									</span>
								</a>
								<a
									href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd#comments"
									className="py-1 pl-1 pr-2 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-black">
									<svg
										className="inline fill-current"
										width="24"
										height="24"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
									</svg>
									20
									<span className="hidden md:inline">
										&nbsp;comments
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Search;