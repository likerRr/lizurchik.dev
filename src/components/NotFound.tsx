'use client';

import Image from 'next/image';
import { NotionContextProvider } from 'react-notion-x';
import notFoundImage from '../../public/not-found.png';
import { mapPageUrl } from '@/lib/mapPageUrl';
import { PageProps } from '@/lib/types';
import { rootNotionPageId, site as configSite } from '@/lib/config';
import { Header } from './renderer/Header';

import 'react-notion-x/src/styles.css';
import '@/styles/notion-x-globals.css';
import styles from '@/styles/styles.module.css';

export default function NotFound({ site = configSite }: PageProps) {
  return (
    <>
      <NotionContextProvider
        mapPageUrl={(pageId, recordMap) => {
          return mapPageUrl(site, recordMap!, new URLSearchParams())(pageId);
        }}
      >
        <Header
          // @ts-expect-error empty block
          block={{}}
          navigationLinks={[
            {
              pageId: rootNotionPageId,
              title: site?.name,
            },
          ]}
        />
      </NotionContextProvider>

      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            src={notFoundImage}
            alt="404 Not Found"
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  );
}
