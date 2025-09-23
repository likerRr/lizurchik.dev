'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { NotionContextProvider } from 'react-notion-x';
import errorImage from '../../public/error.png';
import { rootNotionPageId, site } from '@/lib/config';
import { mapPageUrl } from '@/lib/mapPageUrl';
import { Header } from '@/components/renderer/Header';

import 'react-notion-x/src/styles.css';
import '@/styles/notion-x-globals.css';
import styles from '@/styles/styles.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
              title: site.name,
            },
            {
              pageId: rootNotionPageId,
              title: 'Try again',
              onClick: e => {
                e.preventDefault();
                reset();
              },
            },
          ]}
        />
      </NotionContextProvider>

      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            src={errorImage}
            alt="404 Not Found"
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  );
}
