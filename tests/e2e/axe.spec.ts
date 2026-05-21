import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES_PHASE1 = ["/", "/404"];

for (const path of PAGES_PHASE1) {
  test(`axe: zero violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    // D-14: zero violations = hard block. No severity carve-out.
    expect(result.violations).toEqual([]);
  });
}

const PAGES_PHASE5 = ["/contact", "/about", "/thanks"];

for (const path of PAGES_PHASE5) {
  test(`axe: zero violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}
