/**
 * theme-persistence.spec.ts
 * Verifies theme toggle persists across View Transitions navigation and hard reload.
 * Covers requirements MISC-03 + FOUND-06 / D-07 / D-12.
 *
 * Three sequences:
 *   1. Toggle to dark → navigate to /404 → assert data-theme="dark" survives nav
 *   2. Toggle to dark → hard reload → assert data-theme="dark" persists (localStorage)
 *   3. Fresh session (no localStorage) → assert data-theme matches OS prefers-color-scheme
 */

import { test, expect, type BrowserContext } from "@playwright/test";

test.describe("Theme persistence (MISC-03)", () => {
  test("sequence 1: toggle dark → navigate to /404 → theme persists", async ({ page }) => {
    await page.goto("/");

    // Ensure we start in light mode
    await page.evaluate(() => {
      localStorage.removeItem("theme");
      document.documentElement.dataset.theme = "light";
    });

    // Click the theme toggle to switch to dark
    await page.click(".theme-toggle");

    // Verify dark was set
    const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(themeBefore).toBe("dark");

    // Navigate to /404 (triggering View Transitions if available)
    await page.goto("/404");

    // After navigation, data-theme should still be "dark"
    const themeAfter = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(themeAfter).toBe("dark");
  });

  test("sequence 2: toggle dark → hard reload → theme persists (localStorage)", async ({
    page,
  }) => {
    await page.goto("/");

    // Start from light, toggle to dark
    await page.evaluate(() => {
      localStorage.removeItem("theme");
      document.documentElement.dataset.theme = "light";
    });

    await page.click(".theme-toggle");

    // Verify dark was set and persisted to localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe("dark");

    // Hard reload
    await page.reload();

    // After reload, inline blocking script should restore dark theme
    const themeAfterReload = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(themeAfterReload).toBe("dark");
  });

  test("sequence 3: fresh session with no localStorage → respects OS prefers-color-scheme (dark)", async ({
    browser,
  }) => {
    // Create a context that emulates dark color scheme
    const darkContext: BrowserContext = await browser.newContext({
      colorScheme: "dark",
    });
    const darkPage = await darkContext.newPage();

    // Clear any stored theme
    await darkPage.goto("/");
    await darkPage.evaluate(() => localStorage.removeItem("theme"));
    await darkPage.reload();

    const theme = await darkPage.evaluate(() => document.documentElement.dataset.theme);
    expect(theme).toBe("dark");

    await darkContext.close();
  });

  test("sequence 3b: fresh session with no localStorage → respects OS prefers-color-scheme (light)", async ({
    browser,
  }) => {
    // Create a context that emulates light color scheme
    const lightContext: BrowserContext = await browser.newContext({
      colorScheme: "light",
    });
    const lightPage = await lightContext.newPage();

    await lightPage.goto("/");
    await lightPage.evaluate(() => localStorage.removeItem("theme"));
    await lightPage.reload();

    const theme = await lightPage.evaluate(() => document.documentElement.dataset.theme);
    expect(theme).toBe("light");

    await lightContext.close();
  });
});
