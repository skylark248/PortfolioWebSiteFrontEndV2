import { test, expect } from "@playwright/test";

test.describe("/resume print stylesheet (RES-02 / RES-03)", () => {
  test("D-10: hides nav/footer/theme-toggle/download CTA under @media print", async ({ page }) => {
    await page.goto("/resume");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("header")).toBeHidden();
    await expect(page.locator("nav")).toBeHidden();
    await expect(page.locator("footer")).toBeHidden();
    await expect(page.locator(".download-cta")).toBeHidden();
  });

  test("D-15: forces light mode in print regardless of [data-theme]", async ({ page }) => {
    await page.goto("/resume");
    await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
    await page.emulateMedia({ media: "print" });
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toMatch(/rgb\(255,\s*255,\s*255\)/);
  });

  test("RES-03 / D-08: body is single-column under print (no column-count on ancestors of .work-entry)", async ({ page }) => {
    await page.goto("/resume");
    await page.emulateMedia({ media: "print" });
    const anyColumnated = await page.evaluate(() => {
      const work = document.querySelector(".work-entry");
      if (!work) return "no-work-entry";  // placeholder shipped → RED until Wave 2
      let node: HTMLElement | null = work as HTMLElement;
      while (node) {
        const cc = getComputedStyle(node).columnCount;
        if (cc && cc !== "auto") return cc;
        node = node.parentElement;
      }
      return "auto";
    });
    expect(anyColumnated).toBe("auto");
  });
});
