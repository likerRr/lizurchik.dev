import { PropsWithChildren } from 'react';
import { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { feedUrl, host, rootNotionPageId, site } from '../lib/config';
import { getSocialImageUrl } from '../lib/getSocialImageUrl';
import { readConfig } from '../lib/readConfig';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width, shrink-to-fit=no',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#272727' },
    { media: '(prefers-color-scheme: light)', color: '#272727' },
  ],
};

export function generateMetadata(): Metadata {
  const siteName = site.name;
  const defaultName = siteName.split(' | ')[0];
  const description = site.description;
  const canonical = `https://${site.domain}`;
  const rssFeedUrl = `${host}${feedUrl}`;
  const titleTemplateString = {
    default: defaultName,
    template: readConfig('titleTemplate'),
  };

  return {
    metadataBase: new URL(host),
    title: titleTemplateString,
    description,
    openGraph: {
      title: titleTemplateString,
      siteName,
      description,
      images: getSocialImageUrl(rootNotionPageId) ?? undefined,
      url: canonical,
      type: 'website',
    },
    twitter: {
      description,
      card: 'summary',
      title: titleTemplateString,
    },
    alternates: {
      types: {
        'application/rss+xml': rssFeedUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black',
    },
  };
}

type Props = PropsWithChildren;

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
