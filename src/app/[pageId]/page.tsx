import { AppShell, AppShellMain } from '@mantine/core';
import { getAllPagesInSpace } from 'notion-utils';
import { notionApi } from '../../lib/notionApi';
import { readConfig } from '../../lib/readConfig';
import { NotionPage } from '../components/NotionPage';

export async function generateStaticParams() {
  const pageMap = await getAllPagesInSpace(
    readConfig('rootPageId'),
    undefined,
    pageId => notionApi.getPage(pageId),
    {
      maxDepth: 1,
    },
  );

  return Object.keys(pageMap).map(pageId => ({
    pageId,
  }));
}

type Props = {
  params: Promise<{ pageId: string }>;
};

export default async function Page({ params }: Props) {
  const { pageId } = await params;
  const recordMap = await notionApi.getPage(pageId);

  return (
    <AppShell>
      <AppShellMain>
        <NotionPage recordMap={recordMap} />
      </AppShellMain>
    </AppShell>
  );
}
