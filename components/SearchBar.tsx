import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { getAutoCompleteResults, encodeQuery } from "../utils/searx";
import Router from "next/router";

const SearchBar = ({
	className = "",
	shadow = true,
	defaultValue = "",
}: {
	className?: string;
	shadow?: boolean;
	defaultValue?: string;
}) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
	const onType = async function (event: any) {
		const text = event.target.value;

		if (text !== "") {
			const suggestions = await getAutoCompleteResults(encodeQuery(text));
			setSuggestions(suggestions[1].slice(0, 5));
		} else {
			setSuggestions([]);
		}

		setSelectedSuggestion(-1);
	};

	const onKey = async function (event: any) {
		if (event.keyCode === 13) {
			if (selectedSuggestion === -1)
				// Submit the search
				Router.push(`/search?q=${encodeQuery(event.target.value)}`);
			else
				Router.push(
					`/search?q=${encodeQuery(suggestions[selectedSuggestion])}`
				);
		}

		if (event.keyCode === 40) {
			// Arrow key down
			if (selectedSuggestion === -1) {
				setSelectedSuggestion(0);
			} else if (selectedSuggestion < suggestions.length - 1) {
				setSelectedSuggestion(selectedSuggestion + 1);
			}
		}

		if (event.keyCode === 38) {
			// Arrow key up
			if (selectedSuggestion === 0) {
				setSelectedSuggestion(-1);
			} else if (selectedSuggestion > 0) {
				setSelectedSuggestion(selectedSuggestion - 1);
			}
		}
	};
	return (
		<div className={`relative w-full ${className}`}>
			<div className="relative">
				<input
					type="text"
					className={`z-10 w-full px-4 py-2 border-2 border-gray-200 rounded-md
							${shadow && "shadow-md"} outline-none ring-0 active:ring-0 ${
						JSON.stringify(suggestions) !== "[]"
							? "border-b-0 rounded-b-none shadow-none"
							: ""
					}`}
					placeholder="Search"
					onChange={onType}
					onKeyUp={onKey}
					defaultValue={defaultValue}
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
			<div id="suggestions" className="absolute w-full top-10">
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
									<Suggestion
										text={s}
										key={s}
										selected={
											s ===
											suggestions[selectedSuggestion]
										}
									/>
								))}
							</ul>
						</div>
					) : (
						<></>
					)}
				</Transition>
			</div>
		</div>
	);
};

const Suggestion = ({
	text,
	selected,
}: {
	text: string;
	selected: boolean;
}) => {
	const redirectToSearch = (event: any) => {
		Router.push(`/search?q=${encodeQuery(text)}`);
	};
	return (
		<li
			className={`p-2 duration-200 rounded-sm hover:bg-gray-100 ${
				selected && "bg-gray-100"
			}`}
			onClick={redirectToSearch}>
			{text}
		</li>
	);
};

export default SearchBar;
