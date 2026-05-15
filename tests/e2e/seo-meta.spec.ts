/**
 * seo-meta.spec.ts
 *
 * View-source checks on / and /404 for canonical, OG, and Twitter meta tags.
 * Covers SEO-01.
 */

import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", label: "home" },
  { path: "/404", label: "404" },
];

for (const { path, label } of pages) {
  test.describe(`SEO meta on ${label} (${path})`, () => {
    test("contains canonical link", async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain('<link rel="canonical"');
    });

    test("contains og:title meta tag", async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain('property="og:title"');
    });

    test("contains og:description meta tag", async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain('property="og:description"');
    });

    test("contains og:image meta tag pointing to og-default.png", async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain('property="og:image"');
      expect(html).toContain("og-default.png");
    });

    test("contains Twitter summary_large_image card", async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain("summary_large_image");
    });
  });
}
