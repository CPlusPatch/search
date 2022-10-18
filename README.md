# CPlusPatch Search
This is a Next.js + TailwindCSS search engine powered by Searx-NG in the backend: I made this because I didn't like their UI and wanted to make my own, but couldn't be bothered to make my own implementation of SearX

## Installation
Ensure that you have a SearX (tested with SearX-NG) instance running locally on port 8888, with settings as follows:

```yaml
search:
  ...
  formats:
   - html
   - json

server:
  ...
  default_http_headers:
   Access-Control-Allow-Origin: "*"
   Access-Control-Allow-Methods: GET

```

Then, clone this project and install the dependencies:
```sh
git clone https://github.com/cpluspatch/search.git
cd search
yarn
```

Finally run with `yarn dev`, head over to http://localhost:3000 to see the engine running!

## Troubleshooting

### OpenSearch isn't working properly!

Edit `public/opensearch.xml` and change the URLs to yours (`http://localhost:3000/search?q={searchTerms}` -> `https://example.com/search?q={searchTerms}`).
