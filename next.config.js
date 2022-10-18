/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
	return [
		{
			source: "/opensearch.xml",
			headers: [
				{
					key: "Content-Type",
					value: "application/opensearchdescription+xml",
				},
			],
		},
	];
  }
}

module.exports = nextConfig
