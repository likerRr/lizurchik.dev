import { getAllPagesInSpace, getCanonicalPageId } from 'notion-utils';
import pMemoize from 'p-memoize';
import { includeNotionIdInUrls, site } from './config';
import { notionApi } from './notionApi';
import { getIsPublicProperty } from './properties';
import { readConfig } from './readConfig';
import { SiteMap } from './types';

export const getSiteMap = async (): Promise<SiteMap> => {
  const partialSiteMap = await getAllPages(
    readConfig('rootNotionPageId'),
    readConfig('rootNotionSpaceId'),
  );

  return {
    site,
    ...partialSiteMap,
  } as SiteMap;
};

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});

type GetPageOptions = Parameters<typeof notionApi.getPage>[1];

const getPage = async (pageId: string, opts?: GetPageOptions) => {
  // console.log('\nnotion getPage', uuidToId(pageId));
  return notionApi.getPage(pageId, {
    kyOptions: {
      timeout: 30_000,
    },
    ...opts,
  });
};

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId?: string,
  {
    maxDepth = 1,
  }: {
    maxDepth?: number;
  } = {},
): Promise<Partial<SiteMap>> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
    {
      maxDepth,
    },
  );

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map: Record<string, string>, pageId: string) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }

      const block = recordMap.block[pageId]?.value;

      if (!getIsPublicProperty(block!, recordMap)) {
        return map;
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid: includeNotionIdInUrls,
      })!;

      if (map[canonicalPageId]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId],
        });

        return map;
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId,
        };
      }
    },
    {},
  );

  return {
    pageMap,
    canonicalPageMap,
  };
}
