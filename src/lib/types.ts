import { ExtendedRecordMap, PageMap } from 'notion-types';

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export type Site = {
  name: string;
  domain: string;

  rootNotionPageId: string;
  rootNotionSpaceId: string | null;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
};

export type SiteMap = {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
};

export type PageError = {
  message?: string;
  statusCode: number;
};

export type PageProps = {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
};

export type PageUrlOverridesMap = {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string;
};

export interface PageUrlOverridesInverseMap {
  // maps from a notion page id to the URL path the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pageId: string]: string;
}
