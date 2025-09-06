import { Metadata } from 'next';
import { host } from '../lib/config';
import NotFound from './components/NotFound';

const title = 'Not Found';
const description = 'The page you are looking for does not exist.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: `${host}/not-found.png`,
  },
  twitter: {
    title,
    description,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
