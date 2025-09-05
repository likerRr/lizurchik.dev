import type * as types from 'notion-types';
import { CSSProperties } from 'react';
import { Breadcrumbs, cs, Search, useNotionContext } from 'react-notion-x';

import { config } from '../../../../config';
import { readConfig } from '../../../lib/readConfig';

const notionNavHeaderStyle = {
  '--domain': `"${readConfig('domain')}"`,
} as CSSProperties;

export const Header = ({
  block,
}: {
  block: types.CollectionViewPageBlock | types.PageBlock;
}) => {
  const { components, mapPageUrl } = useNotionContext();

  return (
    <header className="notion-header">
      <div className="notion-nav-header" style={notionNavHeaderStyle}>
        <Breadcrumbs block={block} rootOnly />

        <div className="notion-nav-header-rhs breadcrumbs">
          {config.navigationLinks
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
