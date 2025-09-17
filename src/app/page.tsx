import { Metadata } from 'next';
import { host } from '@/lib/config';
import { getPageMetadata } from '@/lib/getPageMetadata';
import { getMetaTitleTemplate } from '@/lib/metadata';
import { readConfig } from '@/lib/readConfig';
import { resolveNotionPage } from '@/lib/resolveNotionPage';
import { NotionPage } from '@/components/NotionPage';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageId = readConfig('rootNotionPageId');
  const pageMetadata = await getPageMetadata(pageId);

  const title =
    typeof pageMetadata.title === 'object'
      ? pageMetadata.title
      : getMetaTitleTemplate(pageMetadata.title);

  return {
    ...pageMetadata,
    title,
    openGraph: {
      ...pageMetadata.openGraph,
      title,
    },
    twitter: {
      ...pageMetadata.twitter,
      title,
    },
  };
}

const Home = async () => {
  const rootPageId = readConfig('rootNotionPageId');
  const pageProps = await resolveNotionPage(host, rootPageId);

  return <NotionPage {...pageProps} />;
};

export default Home;
