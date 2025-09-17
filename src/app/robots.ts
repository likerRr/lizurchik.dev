import type { MetadataRoute } from 'next';
import { host } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/prompt', '/api/search-notion'],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
