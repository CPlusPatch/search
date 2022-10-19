import React from "react";
import { Config } from "../types/types";
import { getConfig } from "../utils/config";

const createOpenSearchXML = (config: Config) => `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${config.shortName}</ShortName>
  <Description>${config.description}</Description>
  <Url rel="results" type="text/html" method="GET" template="${config.baseUrl}/search?q={searchTerms}"/>
  <InputEncoding>UTF-8</InputEncoding>
  <Image height="64" width="64" type="image/png">/favicon.png</Image>
  <Url rel="self" type="application/opensearchdescription+xml"  method="GET" template="${config.baseUrl}/opensearch.xml"/>
</OpenSearchDescription>`;

class OpenSearchXML extends React.Component {
	static async getInitialProps({ res }: any) {
		res.setHeader("Content-Type", "application/opensearchdescription+xml");
		res.write(createOpenSearchXML(getConfig()));
		res.end();
	}
}

export default OpenSearchXML;
