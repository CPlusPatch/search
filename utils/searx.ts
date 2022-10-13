import { SearxSearchResult } from "../types/types";

function encodeQuery(query: string): string {
	return encodeURIComponent(query).replace("%20", "+");
}

async function getSearchResults(query: string): Promise<SearxSearchResult> {
	const response: Response = await fetch(`http://localhost:8888/search?q=${query}&format=json`);
	const results: SearxSearchResult = await response.json();

	return results;
}

export {
	getSearchResults
};