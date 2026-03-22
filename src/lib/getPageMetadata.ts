import { PageBlock } from 'notion-types';
import { getBlockTitle, getBlockValue, getPageProperty } from 'notion-utils';
import { defaultPageCover, host } from './config';
import { getSocialImageUrl } from './getSocialImageUrl';
import { mapImageUrl } from './mapImageUrl';
import { getCanonicalPageUrl } from './mapPageUrl';
import { metadataLayout, metadataNotFound } from './metadata';
import { resolveNotionPage } from './resolveNotionPage';

export const getPageMetadata = async (page: string) => {
  const { site, error, pageId, recordMap } = await resolveNotionPage(
    host,
    page,
  );
  const block = pageId ? getBlockValue(recordMap?.block?.[pageId]) : undefined;

  if (error || !site || !recordMap || !pageId || !block) {
    return metadataNotFound;
  }

  const title = getBlockTitle(block, recordMap);
  const description = getPageProperty<string>('Description', block, recordMap);
  const image = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ??
      (block as PageBlock).format?.page_cover ??
      defaultPageCover,
    block,
  );
  const socialImages = getSocialImageUrl(pageId) ?? image;
  const canonical = getCanonicalPageUrl(site, recordMap)(pageId);

  return {
    ...metadataLayout,
    title,
    description,
    openGraph: {
      ...metadataLayout.openGraph,
      title,
      description,
      images: socialImages,
      url: canonical,
    },
    twitter: {
      ...metadataLayout.twitter,
      title,
      description,
      images: socialImages,
      card: socialImages ? 'summary_large_image' : metadataLayout.twitter.card,
    },
    alternates: {
      ...metadataLayout.alternates,
      canonical,
    },
  };
};
