import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearxSearchResult } from "../types/types";
import { getSearchResults } from "../utils/searx"

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
	return (
		<div>
			{results.query}
		</div>
	);
};

export default Search;