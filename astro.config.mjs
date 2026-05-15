// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://shivanshchoudhary.info",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/draft/") && !page.endsWith("/_placeholder"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
