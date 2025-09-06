'use client';

import { NotionContextProvider } from 'react-notion-x';
import { mapPageUrl } from '../../lib/mapPageUrl';
import { PageProps } from '../../lib/types';
import { rootNotionPageId, site as configSite } from '../../lib/config';
import { Header } from './renderer/Header';
import styles from './styles.module.css';

export default function NotFound({ site = configSite }: PageProps) {
  return (
    <>
      <NotionContextProvider
        mapPageUrl={(pageId, recordMap) => {
          return mapPageUrl(site, recordMap!, new URLSearchParams())(pageId);
        }}
      >
        <Header
          // @ts-ignore
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
          <img
            src="/not-found.png"
            alt="404 Not Found"
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  );
}
