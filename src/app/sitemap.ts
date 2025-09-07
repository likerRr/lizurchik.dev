import type { MetadataRoute } from 'next';
import { Block, ExtendedRecordMap } from 'notion-types';
import { idToUuid } from 'notion-utils';
import { host } from '../lib/config';
import { getSiteMap } from '../lib/getSiteMap';
import { getLastModifiedTime } from '../lib/properties';
import { SiteMap } from '../lib/types';

export const revalidate = 3600;

type GetPageDataReturn =
  | { block: Block; recordMap: ExtendedRecordMap }
  | { block: null; recordMap: null };

const getPageData = (pageUUID: string, siteMap: SiteMap): GetPageDataReturn => {
  const recordMap = siteMap.pageMap[pageUUID] ?? null;
  const block = recordMap?.block?.[pageUUID]?.value ?? null;

  return {
    recordMap,
    block,
  } as GetPageDataReturn;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteMap = await getSiteMap();

  const dynamicPages: MetadataRoute.Sitemap = Object.entries(
    siteMap.canonicalPageMap,
  ).map(([canonicalPagePath, pageUUID]) => {
    const { block, recordMap } = getPageData(pageUUID, siteMap);

    const lastModified = block
      ? getLastModifiedTime(block, recordMap)
      : undefined;

    return {
      url: `${host}/${canonicalPagePath}`,
      lastModified: lastModified,
      priority: 0.8,
    };
  });

  const rootNotionPageUUID = idToUuid(siteMap.site.rootNotionPageId);
  const { block, recordMap } = getPageData(rootNotionPageUUID, siteMap);
  const lastModified = block
    ? getLastModifiedTime(block, recordMap)
    : new Date();

  return [
    {
      url: host,
      lastModified: lastModified,
      priority: 1,
    },
    ...dynamicPages,
  ];
}
