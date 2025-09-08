import { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { feedUrl, host, rootNotionPageId, site } from './config';
import { getSocialImageUrl } from './getSocialImageUrl';
import { readConfig } from './readConfig';

const siteName = site.name;
const defaultName = siteName.split(' | ')[0];
const description = site.description;
const canonical = `https://${site.domain}`;
const rssFeedUrl = `${host}${feedUrl}`;
const socialImage = getSocialImageUrl(rootNotionPageId) ?? undefined;

const metaDescription: Metadata['description'] = description;

export const titleTemplateString: TemplateString = {
  default: defaultName,
  template: readConfig('titleTemplate'),
};

export const getMetaTitleTemplate = (title: string) => {
  return titleTemplateString.template.replace('%s', title);
};

const metadataBase: Metadata['metadataBase'] = new URL(host);

const openGraph: Metadata['openGraph'] = {
  title: titleTemplateString,
  siteName,
  description,
  images: socialImage,
  url: canonical,
  type: 'website',
};

const twitter: Metadata['twitter'] = {
  description,
  card: 'summary',
  images: socialImage,
  title: titleTemplateString,
};

const alternates: Metadata['alternates'] = {
  types: {
    'application/rss+xml': rssFeedUrl,
  },
};

const robots: Metadata['robots'] = {
  index: true,
  follow: true,
};

const appleWebApp: Metadata['appleWebApp'] = {
  capable: true,
  statusBarStyle: 'black',
} as const;

export const metadataLayout = {
  metadataBase,
  title: titleTemplateString,
  description: metaDescription,
  openGraph,
  twitter,
  alternates,
  robots,
  appleWebApp,
} satisfies Metadata;

const titleNF = 'Not Found';
const descriptionNF = 'The page you are looking for does not exist.';

export const metadataNotFound = {
  title: titleNF,
  description: descriptionNF,
  openGraph: {
    title: titleNF,
    description: descriptionNF,
    images: `${host}/not-found.png`,
  },
  twitter: {
    title: titleNF,
    description: descriptionNF,
    images: `${host}/not-found.png`,
  },
} satisfies Metadata;
