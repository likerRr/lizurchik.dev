import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { host } from '../../lib/config';
import { getPageMetadata } from '../../lib/getPageMetadata';
import { getSiteMap } from '../../lib/getSiteMap';
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
  const pageProps = await resolveNotionPage(host, pageId);

  if (pageProps.error?.statusCode === 404) {
    notFound();
  }

  if (pageProps.error) {
    throw new Error(pageProps.error?.message ?? 'Failed to load page');
  }

  return <NotionPage {...pageProps} />;
}
