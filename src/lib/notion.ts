import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types';
import { mergeRecordMaps } from 'notion-utils';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { isPreviewImageSupportEnabled, navigationLinks } from './config';
import { notionApi } from './notionApi';
import { getPreviewImageMap } from './previewImages';

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (navigationLinks || [])
      .map(link => link?.pageId)
      .filter(Boolean);

    return pMap(
      navigationLinkPageIds,
      async navigationLinkPageId =>
        notionApi.getPage(navigationLinkPageId, {
          chunkLimit: 1,
          fetchMissingBlocks: false,
          fetchCollections: false,
          signFileUrls: false,
        }),
      {
        concurrency: 4,
      },
    );
  },
);

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notionApi.getPage(pageId);

  const navigationLinkRecordMaps = await getNavigationLinkPages();

  // query each navigation link page and merge in the record map in order to always have data about them
  if (navigationLinkRecordMaps?.length) {
    recordMap = navigationLinkRecordMaps.reduce(
      (map, navigationLinkRecordMap) =>
        mergeRecordMaps(map, navigationLinkRecordMap),
      recordMap,
    );
  }

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap);

    recordMap.preview_images = previewImageMap;
  }

  return recordMap;
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notionApi.search(params);
}
