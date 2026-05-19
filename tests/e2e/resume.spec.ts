import { test, expect } from "@playwright/test";

test.describe("/resume (RES-01..RES-04)", () => {
  test("RES-02: h1 contains the resume owner's name", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.locator("h1")).toContainText("Shivansh Choudhary");
  });

  test("RES-03: h2 elements appear in ATS-friendly order", async ({ page }) => {
    await page.goto("/resume");
    const headings = await page.locator("h2").allTextContents();
    expect(headings).toEqual(["Experience", "Skills", "Projects", "Education"]);
  });

  test("RES-02 / D-16: JSON-LD Person script present in head", async ({ page }) => {
    await page.goto("/resume");
    const html = await page.content();
    expect(html).toContain('type="application/ld+json"');
    // Pull out the first ld+json block and assert @type
    const match = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const parsed = JSON.parse(match![1]);
    expect(parsed["@type"]).toBe("Person");
  });

  test("RES-03 / D-11: Download PDF CTA wired correctly", async ({ page }) => {
    await page.goto("/resume");
    const cta = page.locator('a.download-cta[href="/resume.pdf"]');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("download", "Shivansh_Choudhary_Resume_2026.pdf");
    await expect(cta).toHaveAttribute("aria-label", "Download resume as PDF");
    await expect(cta).toContainText("Download PDF");
  });

  test("RES-03 / D-11: print helper text appears under the CTA", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText(/Or press Cmd \/ Ctrl \+ P to print this page\./i)).toBeVisible();
  });
});
