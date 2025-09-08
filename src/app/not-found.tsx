import { Metadata } from 'next';
import { metadataNotFound } from '../lib/metadata';
import NotFound from './components/NotFound';

export const metadata: Metadata = metadataNotFound;

export default function NotFoundPage() {
  return <NotFound />;
}
