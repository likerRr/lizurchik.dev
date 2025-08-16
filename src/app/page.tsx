import { AppShell, AppShellMain } from '@mantine/core';
import { notionApi } from '../lib/notionApi';
import { readConfig } from '../lib/readConfig';
import { NotionPage } from './components/NotionPage';

export default async function Home() {
  const rootPageId = readConfig('rootPageId');
  const recordMap = await notionApi.getPage(rootPageId);

  return (
    <AppShell>
      <AppShellMain>
        <NotionPage recordMap={recordMap} isIndex />
      </AppShellMain>
    </AppShell>
  );
}
