import { PageBlock } from 'notion-types';
import { getBlockTitle, getPageProperty } from 'notion-utils';
import { defaultPageCover, isDev } from './config';
import { getSocialImageUrl } from './getSocialImageUrl';
import { mapImageUrl } from './mapImageUrl';
import { getCanonicalPageUrl } from './mapPageUrl';
import { readConfig } from './readConfig';
import { resolveNotionPage } from './resolveNotionPage';

export const getPageMetadata = async (page: string) => {
  const { site, error, pageId, recordMap } = await resolveNotionPage(
    readConfig('rootDomain'),
    page,
  );
  const block = pageId ? recordMap?.block?.[pageId]?.value : undefined;

  if (error || !site || !recordMap || !pageId || !block) {
    return {};
  }

  const rootDomain = readConfig('rootDomain');
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
  const canonical = isDev
    ? undefined
    : getCanonicalPageUrl(site, recordMap)(pageId);

  return {
    metadataBase: new URL(rootDomain),
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
