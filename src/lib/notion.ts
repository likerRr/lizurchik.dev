import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types';
import { mergeRecordMaps } from 'notion-utils';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { isPreviewImageSupportEnabled } from './config';
import { notionApi } from './notionApi';
import { getPreviewImageMap } from './previewImages';
import { readConfig } from './readConfig';

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = readConfig('navigationLinks', [])
      .map(link => link?.pageId)
      .filter(Boolean);

    if (navigationLinkPageIds.length) {
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
    }

    return [];
  },
);

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notionApi.getPage(pageId);

  const navigationLinkRecordMaps = await getNavigationLinkPages();

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
