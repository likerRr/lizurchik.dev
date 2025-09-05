import ky from 'ky';
import {
  type ExtendedRecordMap,
  type PreviewImage,
  type PreviewImageMap,
} from 'notion-types';
import { getPageImageUrls, normalizeUrl } from 'notion-utils';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { getPlaiceholder } from 'plaiceholder';

import { db } from './db';
import { mapImageUrl } from './mapImageUrl';

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
): Promise<PreviewImageMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  }).filter(Boolean);

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async url => {
        const cacheKey = normalizeUrl(url);
        return [cacheKey, await getPreviewImage(url, { cacheKey })];
      },
      {
        concurrency: 8,
      },
    ),
  );

  return previewImagesMap;
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string },
): Promise<PreviewImage | null> {
  try {
    try {
      const cachedPreviewImage = await db.get(cacheKey);
      if (cachedPreviewImage) {
        return cachedPreviewImage;
      }
    } catch (err: unknown) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, (err as Error).message);
    }

    const bodyO = await ky(url).arrayBuffer();
    const { base64, metadata } = await getPlaiceholder(Buffer.from(bodyO));

    const previewImage = {
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      dataURIBase64: base64,
    };

    try {
      await db.set(cacheKey, previewImage);
    } catch (err: unknown) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, (err as Error).message);
    }

    return previewImage;
  } catch (err: unknown) {
    console.warn('failed to create preview image', url, (err as Error).message);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
