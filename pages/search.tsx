import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import SearchBar from "../components/SearchBar";
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
				<SearchBar className="relative h-full w-96" shadow={false}/>
			</header>
			{results && (
				<ul className="flex flex-col gap-0 mx-16">
					{results.results?.map((result) => (
						<SearchResult key={result.url} result={result} />
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
		<article className="w-1/2 px-1 py-4 bg-white">
			<div role="presentation">
				<div>
					<div className="pl-12 md:pl-10 xs:pl-10">
						<div className="mb-2">
							<a
								href="/t/react"
								className="flex items-center p-1 text-sm text-gray-600 hover:text-black">
								{`${result.parsed_url[0]}://${result.parsed_url[1]}`}
								{result.parsed_url[2].slice(1).split("/").map((part) => (
									<>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="inline w-3 h-3 mt-1">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>

										{part}
									</>
								))}
							</a>
						</div>
						<h2 className="mb-1 text-xl leading-7 text-blue-500 duration-300 font-inter">
							<a href={result.url} id="article-link-151230">
								{result.title}
							</a>
						</h2>
						<div className="mb-1 leading-6 font-inter line-clamp-2">
							{result.content}
						</div>
						<div className="flex items-center justify-between">
								<div
									className="flex items-center py-1 pl-1 pr-2 text-gray-600">
									{getSearchEngineIcon(
										result.engine,
										"inline fill-current w-4 h-4"
									)}
									<span className="inline ml-2 capitalize">
										{result.engine}
									</span>
								</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Search;