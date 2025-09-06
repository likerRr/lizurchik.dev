'use client';

import Image from 'next/image';
import { idToUuid } from 'notion-utils';
import { useMemo } from 'react';
import { cs, NotionComponents, NotionRenderer } from 'react-notion-x';
import {
  defaultPageCover,
  host,
  isPreviewImageSupportEnabled,
} from '../../lib/config';
import { mapImageUrl } from '../../lib/mapImageUrl';
import { mapPageUrl } from '../../lib/mapPageUrl';
import { readConfig } from '../../lib/readConfig';
import { searchNotion } from '../../lib/searchNotion';
import { PageProps } from '../../lib/types';
import { JSONLD } from './JSONLD';
import NotFound from './NotFound';
import { Code } from './renderer/Code';
import { Header } from './renderer/Header';
import { Collection } from './renderer/Collection';
import { Modal } from './renderer/Modal';

import 'react-notion-x/src/styles.css';
import './notion-x-globals.css';

type Props = PageProps;

const components: Partial<NotionComponents> = {
  nextImage: Image,
  Collection,
  Header,
  Modal,
  Code,
};

export const NotionPage = ({ recordMap, error, site, pageId }: Props) => {
  const block = pageId ? recordMap?.block?.[pageId]?.value : undefined;
  const isIndex = pageId === idToUuid(readConfig('rootNotionPageId'));

  const siteMapPageUrl = useMemo(() => {
    return site
      ? mapPageUrl(site, recordMap!, new URLSearchParams())
      : undefined;
  }, [site, recordMap]);

  if (error || !site || !block || !recordMap) {
    return <NotFound site={site} pageId={pageId} error={error} />;
  }

  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection';

  // TODO social links

  return (
    <>
      {isBlogPost && (
        <JSONLD
          site={site}
          recordMap={recordMap}
          block={block}
          pageId={pageId}
        />
      )}

      <NotionRenderer
        fullPage
        darkMode
        showCollectionViewDropdown={false}
        components={components}
        recordMap={recordMap}
        rootPageId={readConfig('rootNotionPageId')}
        rootDomain={host}
        className={cs(isIndex && 'index-page')}
        bodyClassName={cs(isIndex && 'index-page-body')}
        defaultPageCover={defaultPageCover}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        previewImages={isPreviewImageSupportEnabled}
        searchNotion={searchNotion}
      />
    </>
  );
};
