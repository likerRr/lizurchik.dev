import { parsePageId } from 'notion-utils';
import { getEnv } from './getEnv';
import { getIsAbsoluteUrl } from './getIsAbsoluteUrl';
import { readConfig } from './readConfig';
import { PageUrlOverridesInverseMap, PageUrlOverridesMap, Site } from './types';

export const domain = process.env.NEXT_PUBLIC_DOMAIN ?? '';
export const host = process.env.NEXT_PUBLIC_HOST ?? '';
export const environment = process.env.NODE_ENV || 'development';

export const isDev = environment === 'development';

export const isServer = typeof window === 'undefined';

export const apiBaseUrl = `/api`;

export const feedUrl = '/feed.xml';

export const api = {
  searchNotion: `${apiBaseUrl}/search-notion`,
  getNotionPageInfo: `${apiBaseUrl}/notion-page-info`,
  getSocialImage: `${apiBaseUrl}/social-image`,
};

const getDefaultPageCover = () => {
  const defaultPageCover = readConfig('defaultPageCover');

  if (!defaultPageCover) {
    return undefined;
  }

  return getIsAbsoluteUrl(defaultPageCover)
    ? defaultPageCover
    : `${host}${defaultPageCover}`;
};

export const rootNotionSpaceId = readConfig('rootNotionSpaceId');
export const rootNotionPageId = readConfig('rootNotionPageId');
export const defaultPageCoverPosition = readConfig('defaultPageCoverPosition');
export const defaultPageCover = getDefaultPageCover();
export const defaultPageIcon = readConfig('defaultPageIcon');
export const github = readConfig('github');
export const linkedin = readConfig('linkedin');

export const site: Site = {
  domain,
  name: readConfig('name'),
  rootNotionPageId,
  rootNotionSpaceId: rootNotionSpaceId ?? null,
  description: readConfig('description'),
  image: defaultPageCover,
};

export const author = readConfig('author');

const cleanPageUrlMap = (
  pageUrlMap: PageUrlOverridesMap,
  {
    label,
  }: {
    label: string;
  },
): PageUrlOverridesMap => {
  return Object.keys(pageUrlMap).reduce((acc, uri) => {
    const pageId = pageUrlMap[uri];
    const uuid = parsePageId(pageId, { uuid: false });

    if (!uuid) {
      throw new Error(`Invalid ${label} page id "${pageId}"`);
    }

    if (!uri) {
      throw new Error(`Missing ${label} value for page "${pageId}"`);
    }

    if (!uri.startsWith('/')) {
      throw new Error(
        `Invalid ${label} value for page "${pageId}": value "${uri}" should be a relative URI that starts with "/"`,
      );
    }

    const path = uri.slice(1);

    return {
      ...acc,
      [path]: uuid,
    };
  }, {});
};

function invertPageUrlOverrides(
  pageUrlOverrides: PageUrlOverridesMap,
): PageUrlOverridesInverseMap {
  return Object.keys(pageUrlOverrides).reduce((acc, uri) => {
    const pageId = pageUrlOverrides[uri]!;

    return {
      ...acc,
      [pageId]: uri,
    };
  }, {});
}

export const pageUrlOverrides = cleanPageUrlMap(
  // readConfig('pageUrlOverrides', {}) || {},
  {},
  { label: 'pageUrlOverrides' },
);

export const pageUrlAdditions = cleanPageUrlMap(
  // readConfig('pageUrlAdditions', {}) || {},
  {},
  { label: 'pageUrlAdditions' },
);

export const inversePageUrlOverrides = invertPageUrlOverrides(pageUrlOverrides);

export const includeNotionIdInUrls = isDev;

// Optional redis instance for persisting preview images
export const isRedisEnabled: boolean =
  readConfig('isRedisEnabled', false) || !!getEnv('REDIS_ENABLED', null);

// (if you want to enable redis, only REDIS_HOST and REDIS_PASSWORD are required)
// we recommend that you store these in a local `.env.local` file
export const redisHost = getEnv(
  'REDIS_HOST',
  isRedisEnabled ? undefined : null,
);
export const redisPassword = getEnv(
  'REDIS_PASSWORD',
  isRedisEnabled ? undefined : null,
);
export const redisUser: string = getEnv('REDIS_USER', 'default');
export const redisUrl = getEnv(
  'REDIS_URL',
  isRedisEnabled ? `redis://${redisUser}:${redisPassword}@${redisHost}` : null,
);
export const redisNamespace = getEnv('REDIS_NAMESPACE', 'preview-images');

export const isPreviewImageSupportEnabled = readConfig(
  'isPreviewImageSupportEnabled',
  false,
);
