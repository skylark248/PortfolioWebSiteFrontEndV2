/**
 * sitemap.spec.ts
 *
 * After pnpm build, asserts dist/sitemap-index.xml exists and that no
 * _placeholder URLs are included. Covers SEO-03.
 *
 * Note: This test reads the dist/ artifact from the filesystem (not via a
 * running server), then also verifies the sitemap link appears in <head>.
 */

import { test, expect } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distSitemapPath = resolve(__dirname, "../../dist/sitemap-index.xml");

test.describe("sitemap generation", () => {
  test("dist/sitemap-index.xml exists after build", () => {
    expect(existsSync(distSitemapPath)).toBe(true);
  });

  test("sitemap does not contain _placeholder URLs", () => {
    const sitemapContent = readFileSync(distSitemapPath, "utf-8");
    expect(sitemapContent).not.toContain("_placeholder");
  });

  test("page head contains a sitemap reference", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain('rel="sitemap"');
  });
});
