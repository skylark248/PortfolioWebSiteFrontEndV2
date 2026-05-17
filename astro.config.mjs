// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

export default defineConfig({
  site: "https://shivanshchoudhary.info",
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark-dimmed"],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) =>
        theme.type === "dark" ? '[data-theme="dark"]' : '[data-theme="light"]',
      defaultProps: { showLineNumbers: false },
      plugins: [pluginLineNumbers()],
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes("/draft/") && !page.endsWith("/_placeholder"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            class: "heading-anchor",
            tabIndex: 0,
          },
          content: {
            type: "element",
            tagName: "span",
            properties: { ariaHidden: "true", class: "anchor-icon" },
            children: [{ type: "text", value: "#" }],
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        name: "Inter",
        cssVariable: "--font-sans",
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/Inter-Variable.woff2"],
              weight: "100 900",
              style: "normal",
            },
          ],
        },
      },
      {
        name: "JetBrains Mono",
        cssVariable: "--font-mono",
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/JetBrainsMono-Regular.woff2"],
              weight: "400",
              style: "normal",
            },
          ],
        },
      },
    ],
  },
});
