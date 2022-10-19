export interface Result {
	url: string;
	title: string;
	content: string;
	engine: string;
	parsed_url: string[];
	template: string;
	engines: string[];
	positions: number[];
	score: number;
	category: string;
	pretty_url: string;
	open_group: boolean;
	close_group?: boolean;
	id?: string;
}

export interface Url {
	title: string;
	url: string;
}

export interface Attribute {
	label: string;
	value: string;
	entity: string;
}

export interface Infobox {
	infobox: string;
	id: string;
	content: string;
	img_src: string;
	urls: Url[];
	attributes: Attribute[];
	engine: string;
	engines: string[];
}

export type SearxSearchResult = {
	query?: string;
	number_of_results?: number;
	results?: Result[];
	answers?: any[];
	corrections?: any[];
	infoboxes?: Infobox[];
	suggestions?: string[];
	unresponsive_engines?: any[];
}

export type SearxAutoCompleteResult = [string, string[]]

export type Config = {
	shortName: string;
	longName: string;
	description: string;
	baseUrl: string;
}