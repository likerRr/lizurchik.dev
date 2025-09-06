import { PageBlock } from 'notion-types';
import { getBlockTitle, getPageProperty } from 'notion-utils';
import { defaultPageCover, host, isDev } from './config';
import { getSocialImageUrl } from './getSocialImageUrl';
import { mapImageUrl } from './mapImageUrl';
import { getCanonicalPageUrl } from './mapPageUrl';
import { resolveNotionPage } from './resolveNotionPage';

export const getPageMetadata = async (page: string) => {
  const { site, error, pageId, recordMap } = await resolveNotionPage(
    host,
    page,
  );
  const block = pageId ? recordMap?.block?.[pageId]?.value : undefined;

  if (error || !site || !recordMap || !pageId || !block) {
    return {};
  }

  const title = getBlockTitle(block, recordMap) || undefined;
  const description =
    getPageProperty<string>('Description', block, recordMap) || undefined;
  const image = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      defaultPageCover ||
      undefined,
    block,
  );
  const socialImageUrl = getSocialImageUrl(pageId) || image;
  const canonical = getCanonicalPageUrl(site, recordMap)(pageId);

  return {
    metadataBase: new URL(host),
    title,
    description,
    openGraph: {
      title,
      description,
      images: socialImageUrl,
      url: canonical,
    },
    twitter: {
      title,
      description,
      images: socialImageUrl,
      card: socialImageUrl ? 'summary_large_image' : undefined,
    },
    alternates: {
      canonical,
    },
  };
};
