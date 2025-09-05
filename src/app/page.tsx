import { Metadata } from 'next';
import { host } from '../lib/config';
import { getPageMetadata } from '../lib/getPageMetadata';
import { readConfig } from '../lib/readConfig';
import { resolveNotionPage } from '../lib/resolveNotionPage';
import { NotionPage } from './components/NotionPage';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageId = readConfig('rootNotionPageId');

  return getPageMetadata(pageId);
}

const Home = async () => {
  const rootPageId = readConfig('rootNotionPageId');
  const pageProps = await resolveNotionPage(host, rootPageId);

  return <NotionPage {...pageProps} />;
};

export default Home;
