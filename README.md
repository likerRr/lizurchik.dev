# 🚀 Notion Blog Starter

> A modern, fast, and SEO-optimized blog starter built with Next.js (App Router) and NotionX
> 
> Transform your Notion workspace into a blazing-fast blog with automatic SEO optimization, RSS feeds, and social sharing support.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Notion](https://img.shields.io/badge/Notion-CMS-000000?style=flat-square&logo=notion)](https://www.notion.so/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

This project is a copy-paste fork of [nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) adopted to use Next.js App Router, which powers my own blog [lizurchik.dev](https://lizurchik.dev) deployed on [Vercel](https://vercel.com/).

## ✨ Features

- 🎯 **Zero Configuration** - Works out of the box with your Notion database
- ⚡  **Lightning Fast** - 1-minute cache with Next.js App Router and ISR
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter cards, and sitemap
- 📤 **Social Sharing** - Auto-generated social images for each post
- 📰 **RSS Feed** - Built-in RSS support at `/feed.xml` and `/rss`
- 📄 **Sitemap** - Automatic sitemap generation at `/sitemap.xml`
- 📝 **Draft Support** - Toggle post visibility with Notion's Public property
- 🎨 **Customizable** - Easy theming and configuration
- 🚫 **404 Handling** - Custom not-found pages
- 🗂️ **Collection Support** - Organize posts with Notion databases
- 🔗 **Friendly URLs** - Custom slugs for better readability
- 📱 **Responsive Design** - Looks great on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Notion account with a published page/database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/likerRr/lizurchik.dev
   mv lizurchik.dev notion-blog-starter
   cd notion-blog-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # local
   NEXT_PUBLIC_DOMAIN=localhost:3000
   NEXT_PUBLIC_HOST=http://$NEXT_PUBLIC_DOMAIN
   
   # production
   NEXT_PUBLIC_DOMAIN=yourdomain.com
   NEXT_PUBLIC_HOST=https://yourdomain.com
   ```

4. **Configure your Notion page**
   - Create or use an existing Notion page/database
   - [Publish it to the web](https://www.notion.com/help/guides/publish-notion-pages-to-the-web)
   - Copy the page ID and update `rootNotionPageId` in `config.ts`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your blog!

## ⚙️ Configuration

### Basic Configuration

Edit the `config.ts` file in the root directory to customize your blog:

```typescript
export const config = {
  rootNotionPageId: 'your-notion-page-id',
  // ... other configuration options
}
```

> **📝 Note on Notion Page IDs:** The Notion page IDs in the configuration file are not sensitive data since they refer to publicly published pages. These IDs are intentionally kept in the codebase for transparency and ease of configuration.

**Key Configuration Options:**

- `rootNotionPageId` – The ID of your root Notion page (must be published to web)
- `name` – Your blog name
- `domain` – Your domain name
- `description` – Blog description for SEO
- `defaultPageCover` – Default cover image URL
- `navigationLinks` – Static pages that appear in the site header navigation

### Navigation Links Configuration

Configure static navigation links that will appear in your site header:

```typescript
navigationLinks: [
  {
    title: 'About',
    pageId: '2653641abc5980adb8c4fdb5f59625d5', // Notion page ID
    url: undefined, // Leave undefined for Notion pages
  },
  {
    title: 'Portfolio', 
    pageId: '2653641abc59800da61ccc5208d3e2fc',
    url: undefined,
  },
  {
    title: 'External Link',
    pageId: undefined, // Leave undefined for external URLs
    url: 'https://example.com', // External URL
  },
]
```

### 🎨 Customization Options

#### Favicon
Replace `/src/app/favicon.ico` with your custom favicon file.

#### Default Cover Image
Replace `/public/empty-cover-preview.png` with your default cover image (recommended aspect ratio: 16:9).

#### Predefined Assets
- `/public/empty-cover-preview.png` – Default cover for pages without images
- `/public/not-found.png` – 404 page image
- `/src/app/favicon.ico` – Site favicon

## 📝 Content Management

### Required Notion Database Properties

Set up your Notion database with these properties for full functionality:

| Property | Type | Description                                                        | Required |
|----------|------|--------------------------------------------------------------------|----------|
| **Public** | Checkbox | Controls post visibility                                           | ✅ |
| **Published** | Date | Publication date                                                   | ✅ |
| **Slug** | Text | Custom URL slug                                                    | ✅ |
| **Description** | Text | Meta description for SEO                                           | ❌ |
| **Social Image** | Text | URL for social sharing image<br />(**falls back to a page cover**) | ❌ |
| **Intro** | Text | Short description for post previews<br />on the index page         | ❌ |
| **Tags** | Multi-select | Post categories/tags                                               | ❌ |
| **Last Updated** | Date | Auto-generated update time                                         | ❌ |
| **Created** | Date | Auto-generated creation time                                       | ❌ |

### 🎯 SEO Best Practices

For optimal SEO performance, consider updating the following properties for your posts:

1. **Description** - Used for meta description and search snippets
2. **Social Image** - Custom image for social sharing
3. **Meaningful Title** - Clear, descriptive post titles
4. **Proper Tags** - Relevant categorization for better discovery

## 🔧 Advanced Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
NEXT_PUBLIC_DOMAIN=yourdomain.com
NEXT_PUBLIC_HOST=https://yourdomain.com

# Optional - Redis Cache
REDIS_ENABLED=1
REDIS_HOST=your-redis-host
REDIS_USER=your-redis-user
REDIS_PASSWORD=your-redis-password
# OR
REDIS_URL=redis://your-redis-url
```

### 📊 Redis Caching (Optional)

Enable Redis caching for improved performance when `isPreviewImageSupportEnabled` is active:

**Option 1: Individual Redis credentials**
```env
REDIS_ENABLED=1
REDIS_HOST=localhost
REDIS_USER=default
REDIS_PASSWORD=your-password
```

**Option 2: Redis connection URL**
```env
REDIS_ENABLED=1
REDIS_URL=redis://username:password@host:port
```

### 📡 RSS Feed

RSS feeds are automatically generated and available at:
- `/feed.xml` - Main RSS feed
- `/rss` - Alternative RSS endpoint

Customize RSS generation in `/src/app/feed.xml/route.ts`.

## 🏗️ Project Structure

```
├── config.ts                 # Main configuration
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [pageId]/        # Dynamic page routes
│   │   ├── api/             # API routes
│   │   └── ...
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── styles/              # CSS styles
├── public/                  # Static assets
└── ...
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

If you encounter any questions create a [new issue](../../issues/new).
