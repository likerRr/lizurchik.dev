export const config = {
  rootNotionPageId: '2503641abc59805ea747d35c67f5f7f0',
  rootNotionSpaceId: undefined,
  rootDomain: 'https://lizurchik.dev',
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      pageId: '2653641abc5980adb8c4fdb5f59625d5',
      url: null,
    },
    {
      title: 'Portfolio',
      pageId: '2653641abc59800da61ccc5208d3e2fc',
      url: null,
    },
  ],

  // basic site info (required)
  name: 'lizurchik dev diary',
  domain: 'lizurchik.dev',
  author: 'Alexey Lizurchik',

  // open graph metadata (optional)
  description:
    'Blog by Alexey Lizurchik, Senior Frontend Engineer. Writing about React, TypeScript, developer experience and personal projects',

  // social usernames (optional)
  github: 'likerRr',
  linkedin: 'alizurchik',

  // redis
  isRedisEnabled: false,

  isPreviewImageSupportEnabled: false,
};

export type Config = typeof config;
