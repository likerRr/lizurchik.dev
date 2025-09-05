# Notion Blog Starter

## Customization

### Config

To customize the configuration, edit the `config.ts` file in the root directory.

- `rootNotionPageId` – The ID of the root page in your Notion. This is the page that will be used as the main entry point for your website. This page **must** be [published](https://www.notion.com/help/guides/publish-notion-pages-to-the-web) to web. You can disable indexing in publishing settings dialog if you don't want it to be indexed by search engines (the indexing is relevant only for a Notion page, since you will more likely host your blog separately, and setup SEO yourself).

### Favicon

To customize the [favicon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#image-files-ico-jpg-png), replace the `favicon.ico` file in the `/app` directory with your own favicon file. The new favicon should be named `favicon.ico`.

### Empty cover

If the article doesn't have a cover, the default `/public/empty-cover.png` image will be shown. Replace with your own image if needed. The suggested aspect ratio is 16:9.
