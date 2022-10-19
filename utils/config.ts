import { Config } from "../types/types";

const getConfig = (): Config => {
	return {
		shortName: process.env.SHORT_NAME!,
		longName: process.env.LONG_NAME!,
		baseUrl: process.env.BASE_URL!,
		description: process.env.DESCRIPTION!,
	};
};

export {
	getConfig
}