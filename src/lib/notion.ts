import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types';
import { isPreviewImageSupportEnabled } from './config';
import { notionApi } from './notionApi';
import { getPreviewImageMap } from './previewImages';

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notionApi.getPage(pageId);

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap);

    recordMap.preview_images = previewImageMap;
  }

  return recordMap;
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notionApi.search(params);
}
