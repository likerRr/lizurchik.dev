import { Metadata } from 'next';
import { host } from '../lib/config';
import NotFound from './components/NotFound';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
    images: `${host}/not-found.png`,
  },
  twitter: {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
