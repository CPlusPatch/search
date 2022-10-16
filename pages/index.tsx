import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, Fragment } from 'react';
import { Transition } from "@headlessui/react";
import { getAutoCompleteResults, encodeQuery } from "../utils/searx";
import Router from 'next/router';

const Home: NextPage = () => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const onType = async function(event: any) {
		const text = event.target.value;

		if (text !== "") {
			const suggestions = await getAutoCompleteResults(encodeQuery(text));
			setSuggestions(suggestions[1]);
		} else {
			setSuggestions([]);
		}
	}

	const onKeyUp = async function(event: any) {
		if (event.keyCode === 13) {
			// Submit the search
			Router.push(`/search?q=${encodeQuery(event.target.value)}`);
		}
	}

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
					<div className="relative w-full mt-10">
						<input
							type="text"
							className={`z-10 w-full px-4 py-2 border-2 border-gray-200 rounded-md
							shadow-md outline-none ring-0 active:ring-0 ${
								JSON.stringify(suggestions) !== "[]"
									? "border-b-0 rounded-b-none shadow-none"
									: ""
							}`}
							placeholder="Search"
							onChange={onType}
							onKeyUp={onKeyUp}
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
					<div id="suggestions" className="w-full">
						<Transition
							show={JSON.stringify(suggestions) !== "[]"}
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							{JSON.stringify(suggestions) !== "[]" ? ( // Redundant check because the Transition is too slow
							<div className="w-full p-1 bg-white border-2 border-t-0 border-gray-200 rounded-b-md">
								<ul className="even:border-b-2 even:border-gray-100 font-inter">
									{suggestions.map((s) => (
										<li
											key={s}
											className="p-2 duration-200 rounded-sm hover:bg-gray-100">
											{s}
										</li>
									))}
								</ul>
							</div>
							) : <></>}
						</Transition>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home
