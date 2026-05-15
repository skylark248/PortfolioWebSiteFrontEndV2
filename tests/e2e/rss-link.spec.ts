/**
 * rss-link.spec.ts
 *
 * Asserts the RSS link appears in <head> and that /rss.xml returns valid XML.
 * Covers SEO-04.
 */

import { test, expect } from "@playwright/test";

test.describe("RSS feed", () => {
  test("home page head contains RSS alternate link", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain('rel="alternate"');
    expect(html).toContain('type="application/rss+xml"');
    expect(html).toContain('href="/rss.xml"');
  });

  test("/rss.xml returns 200 with valid RSS XML", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.trimStart().startsWith("<?xml")).toBe(true);
    expect(body).toContain("<rss");
  });
});
