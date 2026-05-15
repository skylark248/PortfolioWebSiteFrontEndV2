/**
 * analytics.spec.ts
 *
 * Asserts exactly one gtag.js script tag with G-TFBV6QLYQB, defer attribute,
 * and no async attribute. Runs against a production build (pnpm preview).
 * Covers FOUND-12.
 *
 * The playwright.config.ts webServer runs pnpm preview (a production build),
 * so import.meta.env.PROD === true and Analytics component renders the script.
 */

import { test, expect } from "@playwright/test";

test.describe("Analytics component (production build)", () => {
  test("page contains exactly one gtag.js script tag with G-TFBV6QLYQB", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();

    // Count occurrences of the gtag script src
    const matches = html.match(/googletagmanager\.com\/gtag\/js\?id=G-TFBV6QLYQB/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(1);
  });

  test("gtag script tag has defer attribute", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();

    // The script tag that loads gtag must have defer
    const gtag_script_pattern = /<script[^>]*googletagmanager\.com\/gtag\/js[^>]*>/;
    const match = html.match(gtag_script_pattern);
    expect(match).not.toBeNull();
    expect(match![0]).toContain("defer");
  });

  test("gtag script tag does NOT have async attribute", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();

    const gtag_script_pattern = /<script[^>]*googletagmanager\.com\/gtag\/js[^>]*>/;
    const match = html.match(gtag_script_pattern);
    expect(match).not.toBeNull();
    expect(match![0]).not.toContain("async");
  });

  test("gtag script tag has is:inline (rendered inline in HTML)", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();

    // The gtag src should be an external URL (not a bundled hash)
    expect(html).toContain("https://www.googletagmanager.com/gtag/js");
  });
});
