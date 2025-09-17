import dynamic from 'next/dynamic';

export const Code = dynamic(
  () =>
    import('react-notion-x/build/third-party/code').then(async m => {
      // add / remove any prism syntaxes here
      await Promise.allSettled([
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-markup-templating.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-markup.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-bash.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-c.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-cpp.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-csharp.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-docker.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-java.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-js-templates.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-typescript.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-coffeescript.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-diff.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-git.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-go.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-graphql.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-handlebars.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-less.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-makefile.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-markdown.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-objectivec.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-ocaml.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-python.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-reason.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-rust.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-sass.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-scss.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-solidity.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-sql.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-stylus.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-swift.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-wasm.js'),
        // @ts-expect-error Ignore prisma types
        import('prismjs/components/prism-yaml.js'),
      ]);

      return m.Code;
    }),
  {
    ssr: false,
    loading: () => <pre>Loading code example...</pre>,
  },
);
