import { AppShell, AppShellMain } from '@mantine/core';
import { NotionAPI } from 'notion-client';
import { readConfig } from '../lib/readConfig';
import { NotionPage } from './components/NotionPage';

const api = new NotionAPI();

export default async function Home() {
  const rootPageId = readConfig('rootPageId');
  const recordMap = await api.getPage(rootPageId);

  return (
    <AppShell>
      <AppShellMain>
        <NotionPage recordMap={recordMap} isIndex />
      </AppShellMain>
    </AppShell>
  );
}
