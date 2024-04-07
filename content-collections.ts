import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

import { bundleMDX } from 'mdx-bundler'
import * as ReactDOMServer from 'react-dom/server'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { Tweet } from "react-tweet";

export const mdxToHtml = async (mdxSource: string) => {
  const { code } = await bundleMDX({ source: mdxSource })
  const MDXLayout = getMDXComponent(code)
  const element = MDXLayout({ components: {
    Tweet
  } })!
  const html = ReactDOMServer.renderToString(element)
  return html
}

const posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const html = await mdxToHtml(document.content)
    return {
      ...document,
      body,
      html
    };
  },
});

export default defineConfig({
  collections: [posts],
});