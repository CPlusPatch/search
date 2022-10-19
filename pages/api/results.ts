// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SearxSearchResult } from '../../types/types'
import { getSearchResults } from '../../utils/searx';
import { randomUUID } from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearxSearchResult>
) {
	const { q } = req.query;
	const results: SearxSearchResult = await getSearchResults(q!.toString());
	for (var result of (results.results ?? [])) {
		result.id = randomUUID();
	}
	res.status(200).json(results);
}
