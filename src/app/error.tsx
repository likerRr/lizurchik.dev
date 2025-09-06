'use client';

import { useEffect } from 'react';
import { NotionContextProvider } from 'react-notion-x';
import { rootNotionPageId, site } from '../lib/config';
import { mapPageUrl } from '../lib/mapPageUrl';
import { Header } from './components/renderer/Header';

import 'react-notion-x/src/styles.css';
import './components/notion-x-globals.css';
import styles from './components/styles.module.css';

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
          <img
            src="/error.png"
            alt="404 Not Found"
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  );
}
