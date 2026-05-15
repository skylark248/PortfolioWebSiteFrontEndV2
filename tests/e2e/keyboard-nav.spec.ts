/**
 * keyboard-nav.spec.ts
 * Verifies keyboard accessibility: Tab cycles to theme toggle and a visible
 * :focus-visible ring appears (non-zero outline width).
 * Covers requirement AP-03.
 */

import { test, expect } from "@playwright/test";

test.describe("Keyboard navigation (AP-03)", () => {
  test("Tab key can reach the theme toggle (#theme-toggle)", async ({ page }) => {
    await page.goto("/");

    // Tab through focusable elements until we reach theme-toggle or exhaust attempts
    let found = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => document.activeElement?.id);
      if (focused === "theme-toggle") {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  });

  test("theme toggle shows a visible focus ring when keyboard-focused", async ({ page }) => {
    await page.goto("/");

    // Tab to the theme toggle
    let found = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => document.activeElement?.id);
      if (focused === "theme-toggle") {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);

    // Check computed outline style on the focused button
    const outlineWidth = await page.evaluate(() => {
      const el = document.getElementById("theme-toggle");
      if (!el) return "0px";
      return window.getComputedStyle(el).outlineWidth;
    });

    // Outline width should be non-zero (e.g., "2px")
    expect(outlineWidth).not.toBe("0px");
    expect(outlineWidth).not.toBe("");
  });

  test("theme toggle has aria-label for screen readers", async ({ page }) => {
    await page.goto("/");
    const ariaLabel = await page.getAttribute("#theme-toggle", "aria-label");
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel!.length).toBeGreaterThan(0);
  });

  test("theme toggle has aria-pressed attribute", async ({ page }) => {
    await page.goto("/");
    const ariaPressed = await page.getAttribute("#theme-toggle", "aria-pressed");
    expect(ariaPressed).not.toBeNull();
  });
});
