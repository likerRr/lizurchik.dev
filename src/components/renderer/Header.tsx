import { getIsCollectionPage } from '@/lib/properties';
import type * as types from 'notion-types';
import { CSSProperties, MouseEventHandler } from 'react';
import { Breadcrumbs, cs, Search, useNotionContext } from 'react-notion-x';
import { domain, navigationLinks as defaultNavLinks } from '@/lib/config';

import styles from '@/styles/styles.module.css';

const notionNavHeaderStyle = {
  '--domain': `"${domain}"`,
  '--domain-ch': `${domain.length}ch`,
  // a fallback if "ch" is not supported
  '--domain-px': '100px',
} as CSSProperties;

export const Header = ({
  block,
  navigationLinks = defaultNavLinks,
}: {
  block: types.CollectionViewPageBlock | types.PageBlock;
  navigationLinks?: {
    title: string;
    pageId?: string;
    url?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }[];
}) => {
  const { components, mapPageUrl } = useNotionContext();
  const isPage = getIsCollectionPage(block);

  return (
    <header className="notion-header">
      {isPage && <div className={styles.readingProgress} />}

      <div className="notion-nav-header" style={notionNavHeaderStyle}>
        <Breadcrumbs block={block} rootOnly />

        <div className="notion-nav-header-rhs breadcrumbs">
          {navigationLinks
            ?.map((link, index) => {
              if (!link?.pageId && !link?.url) {
                return null;
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs('breadcrumb', 'button')}
                    onClick={link.onClick}
                  >
                    {link.title}
                  </components.PageLink>
                );
              }

              return (
                <components.Link
                  href={link.url}
                  key={index}
                  className={cs('breadcrumb', 'button')}
                  onClick={link.onClick}
                >
                  {link.title}
                </components.Link>
              );
            })
            .filter(Boolean)}

          <Search block={block} title={null} />
        </div>
      </div>
    </header>
  );
};
