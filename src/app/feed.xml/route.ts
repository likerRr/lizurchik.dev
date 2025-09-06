import { type ExtendedRecordMap } from 'notion-types';
import {
  getBlockParentPage,
  getBlockTitle,
  getPageProperty,
  idToUuid,
} from 'notion-utils';
import RSS from 'rss';
import { feedUrl, host, rootNotionPageId, site } from '../../lib/config';
import { getSiteMap } from '../../lib/getSiteMap';
import { getSocialImageUrl } from '../../lib/getSocialImageUrl';
import { getCanonicalPageUrl } from '../../lib/mapPageUrl';
import { getIsPublicProperty } from '../../lib/properties';

export const GET = async () => {
  const siteMap = await getSiteMap();
  const ttlMinutes = 24 * 60; // 24 hours
  const ttlSeconds = ttlMinutes * 60;

  const feed = new RSS({
    title: site.name,
    site_url: host,
    feed_url: `${host}${feedUrl}`,
    language: 'en',
    ttl: ttlMinutes,
  });

  for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
    const pageId = siteMap.canonicalPageMap[pagePath]!;
    const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap;

    if (!recordMap) {
      continue;
    }

    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]!]?.value;

    if (!block) {
      continue;
    }

    const parentPage = getBlockParentPage(block, recordMap);
    const isBlogPost =
      block.type === 'page' &&
      block.parent_table === 'collection' &&
      parentPage?.id === idToUuid(rootNotionPageId);

    if (!isBlogPost) {
      continue;
    }

    if (!getIsPublicProperty(block!, recordMap)) {
      continue;
    }

    const title = getBlockTitle(block, recordMap) || site.name;
    const description =
      getPageProperty<string>('Description', block, recordMap) ||
      site.description ||
      '';
    const url = getCanonicalPageUrl(site, recordMap)(pageId);
    const lastUpdatedTime = getPageProperty<number>(
      'Last Updated',
      block,
      recordMap,
    );
    const publishedTime = getPageProperty<number>(
      'Published',
      block,
      recordMap,
    );
    const date = lastUpdatedTime
      ? new Date(lastUpdatedTime)
      : publishedTime
        ? new Date(publishedTime)
        : new Date();
    const socialImageUrl = getSocialImageUrl(pageId);

    feed.item({
      title,
      url,
      date,
      description,
      enclosure: socialImageUrl
        ? {
            url: socialImageUrl,
            type: 'image/jpeg',
          }
        : undefined,
    });
  }

  const feedText = feed.xml({ indent: true });

  return new Response(feedText, {
    headers: {
      'Cache-Control': `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`,
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
