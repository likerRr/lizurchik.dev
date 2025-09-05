'use client';

import Image from 'next/image';
import { idToUuid } from 'notion-utils';
import { useMemo } from 'react';
import { cs, NotionComponents, NotionRenderer } from 'react-notion-x';
import { isPreviewImageSupportEnabled } from '../../lib/config';
import { mapPageUrl } from '../../lib/mapPageUrl';
import { readConfig } from '../../lib/readConfig';
import { searchNotion } from '../../lib/searchNotion';
import { PageProps } from '../../lib/types';
import { JSONLD } from './JSONLD';
import { Code } from './renderer/Code';
import { Header } from './renderer/Header';
import { Collection } from './renderer/Collection';
import { Modal } from './renderer/Modal';
import nrStyles from './notion-renderer.module.css';

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
    // TODO
    // return <Page404 site={site} pageId={pageId} error={error} />;
    return 'not found';
  }

  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection';

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
        rootDomain={readConfig('rootDomain')}
        className={cs(isIndex && 'index-page')}
        bodyClassName={cs(isIndex && 'index-page-body', nrStyles.page)}
        mapPageUrl={siteMapPageUrl}
        previewImages={isPreviewImageSupportEnabled}
        searchNotion={searchNotion}
      />
    </>
  );
};
