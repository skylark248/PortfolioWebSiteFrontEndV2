/**
 * One-shot verification that the .theme-toggle button actually flips the
 * data-theme attribute and persists the choice. Boots Playwright headlessly
 * against the dev server, clicks the first .theme-toggle, asserts the state
 * changes, then clicks again and asserts it flips back. Reports PASS/FAIL.
 *
 * Run with `node scripts/verify-theme-toggle.mjs` while `pnpm dev` is up.
 */

import { chromium } from "@playwright/test";

const URL_BASE = process.env.PRINT_CHECK_URL ?? "http://localhost:4321";

const browser = await chromium.launch();
let exitCode = 0;

try {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(URL_BASE + "/", { waitUntil: "networkidle" });

  // Clear any stale localStorage so we start from the default.
  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload({ waitUntil: "networkidle" });

  const initial = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log("initial data-theme:", initial);

  // Click the first toggle (the desktop nav one).
  await page.click(".theme-toggle");
  await page.waitForTimeout(60);
  const afterFirst = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    stored: localStorage.getItem("theme"),
  }));
  console.log("after first click:", afterFirst);

  // Click again — should flip back.
  await page.click(".theme-toggle");
  await page.waitForTimeout(60);
  const afterSecond = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    stored: localStorage.getItem("theme"),
  }));
  console.log("after second click:", afterSecond);

  // Assertions.
  if (initial !== "dark") {
    console.error("FAIL: expected initial theme dark, got " + initial);
    exitCode = 1;
  }
  if (afterFirst.theme !== "light") {
    console.error("FAIL: expected first click to flip to light");
    exitCode = 1;
  }
  if (afterSecond.theme !== "dark") {
    console.error("FAIL: expected second click to flip back to dark");
    exitCode = 1;
  }
  if (exitCode === 0) {
    console.log("PASS: toggle works in both directions and persists to localStorage.");
  }
} finally {
  await browser.close();
}

process.exit(exitCode);
