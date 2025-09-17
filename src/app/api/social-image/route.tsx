/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

import ky from 'ky';
import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { type PageBlock } from 'notion-types';
import {
  getBlockIcon,
  getBlockTitle,
  getPageProperty,
  isUrl,
  parsePageId,
} from 'notion-utils';
import interSemiBoldFont from '@/lib/fonts/inter-semibold';
import {
  defaultPageCover,
  defaultPageCoverPosition,
  defaultPageIcon,
  rootNotionSpaceId,
  site,
  author as configAuthor,
} from '../../../lib/config';
import { mapImageUrl } from '@/lib/mapImageUrl';
import { notionApi } from '@/lib/notionApi';
import { getIsCollectionPage } from '@/lib/properties';
import { readConfig } from '@/lib/readConfig';
import { NotionPageInfo, PageError } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const pageId = parsePageId(
    searchParams.get('id') || readConfig('rootNotionPageId'),
  );
  if (!pageId) {
    return new Response('Invalid notion page id', { status: 400 });
  }

  const pageInfoOrError = await getNotionPageInfo({ pageId });

  if (pageInfoOrError.type === 'error') {
    return Response.json(
      {
        error: pageInfoOrError.error.message,
      },
      {
        status: pageInfoOrError.error.statusCode,
      },
    );
  }

  const pageInfo = pageInfoOrError.data;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1F2027',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        {pageInfo.image && (
          <img
            src={pageInfo.image}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {!pageInfo.isBlogPost && pageInfo.authorImage && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 536,
              height: 128,
              width: 128,
              display: 'flex',
              borderRadius: '50%',
              border: '4px solid #272727',
              zIndex: '5',
            }}
          >
            <img
              src={pageInfo.authorImage}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 680,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}

async function getNotionPageInfo({
  pageId,
}: {
  pageId: string;
}): Promise<
  | { type: 'success'; data: NotionPageInfo }
  | { type: 'error'; error: PageError }
> {
  const recordMap = await notionApi.getPage(pageId);
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]!]?.value;

  if (!block) {
    throw new Error('Invalid recordMap for page');
  }

  const blockSpaceId = block.space_id;

  if (blockSpaceId && rootNotionSpaceId && blockSpaceId !== rootNotionSpaceId) {
    return {
      type: 'error',
      error: {
        statusCode: 400,
        message: `Notion page "${pageId}" belongs to a different workspace.`,
      },
    };
  }

  const isBlogPost = getIsCollectionPage(block);
  const title = getBlockTitle(block, recordMap) || site.name;

  const imageCoverPosition =
    (block as PageBlock).format?.page_cover_position ??
    defaultPageCoverPosition;
  const imageObjectPosition = imageCoverPosition
    ? `center ${(1 - imageCoverPosition) * 100}%`
    : undefined;

  const imageBlockUrl = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover,
    block,
  );
  const imageFallbackUrl = mapImageUrl(defaultPageCover, block);

  const blockIcon = getBlockIcon(block, recordMap);
  const authorImageBlockUrl = mapImageUrl(
    blockIcon && isUrl(blockIcon) ? blockIcon : undefined,
    block,
  );
  const authorImageFallbackUrl = mapImageUrl(defaultPageIcon, block);
  const [authorImage, image] = await Promise.all([
    getCompatibleImageUrl(authorImageBlockUrl, authorImageFallbackUrl),
    getCompatibleImageUrl(imageBlockUrl, imageFallbackUrl),
  ]);

  const author =
    getPageProperty<string>('Author', block, recordMap) || configAuthor;

  const publishedTime = getPageProperty<number>('Published', block, recordMap);
  const datePublished = publishedTime ? new Date(publishedTime) : undefined;

  const date =
    isBlogPost && datePublished
      ? `${datePublished.toLocaleString('en-US', {
          month: 'long',
        })} ${datePublished.getFullYear()}`
      : undefined;
  const detail = date || author || site.domain;

  const pageInfo: NotionPageInfo = {
    pageId,
    title,
    image,
    imageObjectPosition,
    author,
    authorImage,
    detail,
    isBlogPost,
  };

  return {
    type: 'success',
    data: pageInfo,
  };
}

async function isUrlReachable(
  url: string | undefined | null,
): Promise<boolean> {
  if (!url) {
    return false;
  }

  try {
    await ky.head(url);
    return true;
  } catch {
    return false;
  }
}

async function getCompatibleImageUrl(
  url: string | undefined | null,
  fallbackUrl: string | undefined | null,
): Promise<string | undefined> {
  const image = (await isUrlReachable(url)) ? url : fallbackUrl;

  if (image) {
    const imageUrl = new URL(image);

    if (imageUrl.host === 'images.unsplash.com') {
      if (!imageUrl.searchParams.has('w')) {
        imageUrl.searchParams.set('w', '1200');
        imageUrl.searchParams.set('fit', 'max');

        return imageUrl.toString();
      }
    }
  }

  return image ?? undefined;
}
