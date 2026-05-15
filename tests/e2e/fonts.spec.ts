/**
 * fonts.spec.ts
 * Verifies self-hosted fonts: preload tag present, zero external font requests.
 * Covers requirement FOUND-05.
 */

import { test, expect } from "@playwright/test";

test.describe("Self-hosted fonts (FOUND-05)", () => {
  test("page has at least one <link rel=preload as=font> tag", async ({ page }) => {
    await page.goto("/");
    const preloads = await page.$$("link[rel='preload'][as='font']");
    expect(preloads.length).toBeGreaterThan(0);
  });

  test("zero requests to fonts.googleapis.com", async ({ page }) => {
    const googleFontRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("fonts.googleapis.com")) {
        googleFontRequests.push(req.url());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(googleFontRequests).toHaveLength(0);
  });

  test("zero requests to fonts.gstatic.com", async ({ page }) => {
    const gstaticRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("fonts.gstatic.com")) {
        gstaticRequests.push(req.url());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(gstaticRequests).toHaveLength(0);
  });
});
