import { Block, ExtendedRecordMap, PageBlock } from 'notion-types';
import { getBlockTitle, getPageProperty } from 'notion-utils';
import { author, isDev } from '../../lib/config';
import { mapImageUrl } from '../../lib/mapImageUrl';
import { getCanonicalPageUrl } from '../../lib/mapPageUrl';
import { readConfig } from '../../lib/readConfig';
import { Site } from '../../lib/types';

type Props = {
  site: Site;
  pageId?: string;
  block: Block;
  recordMap: ExtendedRecordMap;
};

export const JSONLD = ({ site, block, recordMap, pageId }: Props) => {
  const title = getBlockTitle(block, recordMap) || site.name;
  const description =
    getPageProperty<string>('Description', block, recordMap) ||
    readConfig('description');
  const socialImageUrl = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      undefined,
    block,
  );
  const url = isDev ? undefined : getCanonicalPageUrl(site, recordMap)(pageId);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#BlogPosting`,
    mainEntityOfPage: url,
    url,
    headline: title,
    name: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    image: socialImageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
};
