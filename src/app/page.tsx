import { readConfig } from '../lib/readConfig';
import { resolveNotionPage } from '../lib/resolveNotionPage';
import { NotionPage } from './components/NotionPage';

export const revalidate = 60;

export default async function Home() {
  const rootPageId = readConfig('rootNotionPageId');
  const pageProps = await resolveNotionPage(
    readConfig('rootDomain'),
    rootPageId,
  );

  return <NotionPage {...pageProps} />;
}
