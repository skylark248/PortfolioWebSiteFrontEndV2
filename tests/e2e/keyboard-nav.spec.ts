/**
 * keyboard-nav.spec.ts
 * Verifies keyboard accessibility: Tab cycles to theme toggle and a visible
 * :focus-visible ring appears (non-zero outline width).
 * Covers requirement AP-03.
 *
 * Selector note: ThemeToggle now uses class="theme-toggle" (two instances
 * render per page — desktop nav + hamburger drawer). We test the FIRST one
 * via :first-of-type which corresponds to the desktop nav button.
 */

import { test, expect } from "@playwright/test";

const TOGGLE = ".theme-toggle";

test.describe("Keyboard navigation (AP-03)", () => {
  test("Tab key can reach the theme toggle (.theme-toggle)", async ({ page }) => {
    await page.goto("/");

    // Tab through focusable elements until activeElement matches a toggle.
    let found = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const isToggle = await page.evaluate(() =>
        document.activeElement?.classList.contains("theme-toggle") ?? false,
      );
      if (isToggle) {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  });

  test("theme toggle shows a visible focus ring when keyboard-focused", async ({ page }) => {
    await page.goto("/");

    let found = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const isToggle = await page.evaluate(() =>
        document.activeElement?.classList.contains("theme-toggle") ?? false,
      );
      if (isToggle) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);

    // Computed outline width on the focused element should be non-zero.
    const outlineWidth = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return "0px";
      return window.getComputedStyle(el).outlineWidth;
    });

    expect(outlineWidth).not.toBe("0px");
    expect(outlineWidth).not.toBe("");
  });

  test("theme toggle has aria-label for screen readers", async ({ page }) => {
    await page.goto("/");
    const ariaLabel = await page.getAttribute(TOGGLE, "aria-label");
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel!.length).toBeGreaterThan(0);
  });

  test("theme toggle has aria-pressed attribute", async ({ page }) => {
    await page.goto("/");
    const ariaPressed = await page.getAttribute(TOGGLE, "aria-pressed");
    expect(ariaPressed).not.toBeNull();
  });
});
