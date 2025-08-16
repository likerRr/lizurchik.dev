'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ExtendedRecordMap } from 'notion-types';
import { cs, NotionComponents, NotionRenderer } from 'react-notion-x';

import 'react-notion-x/src/styles.css';
import './notion-x-globals.css';
import nrStyles from './notion-renderer.module.css';

type Props = {
  recordMap: ExtendedRecordMap;
  isIndex?: boolean;
};

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(m => m.Collection),
);

const components: Partial<NotionComponents> = {
  nextImage: Image,
  Collection,
};

export const NotionPage = ({ recordMap, isIndex }: Props) => {
  return (
    <>
      <NotionRenderer
        fullPage
        bodyClassName={cs(isIndex && nrStyles.indexPage, nrStyles.page)}
        recordMap={recordMap}
        components={components}
        darkMode={false}
      />
    </>
  );
};
