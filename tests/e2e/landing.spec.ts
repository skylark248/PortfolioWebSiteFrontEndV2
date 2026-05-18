import { test, expect } from "@playwright/test";

test.describe("/ landing page (LAND-01..05)", () => {
  test("LAND-01: hero readable with JS disabled", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    // Hero atoms required by LAND-01 + D-01..D-04
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /Get in touch/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Read my resume/i })).toBeVisible();
    // Status pill text per D-03
    await expect(page.getByText(/Currently @ Morgan Stanley/i)).toBeVisible();
    await ctx.close();
  });

  // The following four are scaffolded as fixme; Plan 03-07 fills them in
  // once Hero / FeaturedRail / SkillsGrouped / index.astro exist.
  // Note: Playwright 1.60 does not support test.todo(); test.fixme() is the equivalent.
  test.fixme("LAND-02: featured cards visible (2–4 case studies + 2–4 projects)", async () => {});
  test.fixme("LAND-03: latest posts section shows ≤3 non-draft posts with title + date + reading time", async () => {});
  test.fixme("LAND-04: skills rendered as text tags only (no <meter>, no rating bars, no <img> for skill names)", async () => {});
  test.fixme("LAND-05: hero name has no animation/transition at first paint (page.evaluate getComputedStyle)", async () => {});
});
