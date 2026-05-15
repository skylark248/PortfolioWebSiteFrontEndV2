// @ts-check
import { defineConfig, fontProviders } from "astro/config";
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
