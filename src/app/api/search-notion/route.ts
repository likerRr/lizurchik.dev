import { NextRequest } from 'next/server';
import { SearchParams } from 'notion-types';
import { search } from '../../../lib/notion';

export const POST = async (req: NextRequest) => {
  const searchParams: SearchParams = await req.json();
  const results = await search(searchParams);

  return Response.json(results, {
    status: 200,
    headers: {
      'Cache-Control':
        'public, s-maxage=60, max-age=60, stale-while-revalidate=60',
    },
  });
};
