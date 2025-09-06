export const config = {
  rootNotionPageId: '2503641abc59805ea747d35c67f5f7f0',
  rootNotionSpaceId: undefined,
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      pageId: '2653641abc5980adb8c4fdb5f59625d5',
      url: undefined,
    },
    {
      title: 'Portfolio',
      pageId: '2653641abc59800da61ccc5208d3e2fc',
      url: undefined,
    },
  ],

  defaultPageIcon:
    'https://www.notion.so/image/attachment%3A869ba76a-f46e-4b2e-be42-1f4aeb1a00e6%3A%D0%94%D0%B8%D0%B7%D0%B0%D0%B8%D0%BD_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_(4).png?table=block&id=2503641a-bc59-805e-a747-d35c67f5f7f0&cache=v2',
  defaultPageCover:
    'https://www.notion.so/image/attachment%3A36f817da-71b4-41af-88b3-73215b3a999b%3Alizurchik.dev_(15).png?table=block&id=2503641a-bc59-805e-a747-d35c67f5f7f0&cache=v2',
  defaultPageCoverPosition: 0.5,

  // basic site info (required)
  name: 'Dev Notes | Alexey Lizurchik',
  // domain: 'lizurchik.dev',
  author: 'Alexey Lizurchik',

  // open graph metadata (optional)
  description:
    'Blog by Alexey Lizurchik, Senior Frontend Engineer. Writing about React, TypeScript, developer experience and personal projects',
  titleTemplate: '%s | Alexey Lizurchik',

  // social usernames (optional)
  github: 'likerRr',
  linkedin: 'alizurchik',

  // redis
  isRedisEnabled: false,

  isPreviewImageSupportEnabled: false,
};

export type Config = typeof config;
