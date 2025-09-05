import { Metadata } from 'next';
import { getPageMetadata } from '../../lib/getPageMetadata';
import { getSiteMap } from '../../lib/getSiteMap';
import { readConfig } from '../../lib/readConfig';
import { resolveNotionPage } from '../../lib/resolveNotionPage';
import { NotionPage } from '../components/NotionPage';

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = await params;

  return getPageMetadata(pageId);
}

export async function generateStaticParams() {
  const siteMap = await getSiteMap();
  const pageIds = Object.keys(siteMap.canonicalPageMap);

  return pageIds.map(pageId => ({
    pageId,
  }));
}

type Props = {
  params: Promise<{ pageId: string }>;
};

export default async function Page({ params }: Props) {
  const { pageId } = await params;
  const pageProps = await resolveNotionPage(readConfig('rootDomain'), pageId);

  return <NotionPage {...pageProps} />;
}
