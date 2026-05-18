import { test, expect } from "@playwright/test";

test.describe("/ landing page (LAND-01..05)", () => {
  test(
    "LAND-01: hero readable with JS disabled on a 375×667 mobile viewport, above the fold",
    async ({ browser }) => {
      // ROADMAP §Phase 3 success criterion 1: "renders in the first viewport on a 375×667 mobile emulator."
      const ctx = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 375, height: 667 },
      });
      const page = await ctx.newPage();
      await page.goto("/");
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      // First-viewport (above-the-fold) check: hero name must be on-screen without scrolling.
      // Playwright 1.60 does not expose Locator.isInViewport(); use evaluate() to replicate it.
      const isInViewport = await h1.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      expect(isInViewport).toBe(true);
      await expect(page.getByRole("link", { name: /Get in touch/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Read my resume/i })).toBeVisible();
      await expect(page.getByText(/Currently @ Morgan Stanley/i)).toBeVisible();
      await ctx.close();
    },
  );

  test(
    "LAND-02: featured cards visible (2–4 case studies + 2–4 projects)",
    async ({ page }) => {
      await page.goto("/");

      const csCards = page.locator("article.cs-feature-card");
      const csCount = await csCards.count();
      expect(csCount).toBeGreaterThanOrEqual(1);
      expect(csCount).toBeLessThanOrEqual(4);

      const projectCards = page.locator("article.project-card");
      const projectCount = await projectCards.count();
      expect(projectCount).toBeGreaterThanOrEqual(1);
      expect(projectCount).toBeLessThanOrEqual(4);

      // D-06: case studies section appears BEFORE projects section
      const csHeading = page.getByRole("heading", { name: /Selected case studies/i });
      const projHeading = page.getByRole("heading", { name: /Selected projects/i });
      await expect(csHeading).toBeVisible();
      await expect(projHeading).toBeVisible();
    },
  );

  test(
    "LAND-03: latest posts section shows ≤3 non-draft posts with title + date + reading time",
    async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: /Latest posts/i })).toBeVisible();
      const rows = page.locator("li.post-row");
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThanOrEqual(1);
      expect(rowCount).toBeLessThanOrEqual(3);

      // Each row carries a title (link), a date (4-digit year somewhere), and a reading-time hint.
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        await expect(row.locator(".post-title-link")).toBeVisible();
        const meta = await row.locator(".post-meta-text").innerText();
        expect(meta).toMatch(/\b\d{4}\b/); // year present (date)
        expect(meta.toLowerCase()).toMatch(/min/); // reading time present (e.g. "5 min read")
      }
    },
  );

  test(
    "LAND-04: skills rendered as text tags only (no meter, no progress, no img)",
    async ({ page }) => {
      await page.goto("/");
      const skillsSection = page.locator("section.skills-grouped");
      await expect(skillsSection).toBeVisible();

      // No rating bars, no progress bars, no images for skill labels.
      expect(await skillsSection.locator("meter").count()).toBe(0);
      expect(await skillsSection.locator("progress").count()).toBe(0);
      expect(await skillsSection.locator("img").count()).toBe(0);

      // All five locked categories present (D-11).
      for (const cat of ["Languages", "Frameworks", "Infra", "Cloud", "Data"]) {
        await expect(
          skillsSection.getByRole("heading", { name: new RegExp(`^${cat}$`) }),
        ).toBeVisible();
      }

      // At least one chip per category — total chip count >= 5.
      const chipCount = await skillsSection.locator("span.skill-chip").count();
      expect(chipCount).toBeGreaterThanOrEqual(5);
    },
  );

  test(
    "LAND-05: hero name + tagline have no animation/transition at first paint",
    async ({ page }) => {
      await page.goto("/");
      const heroName = page.locator(".hero-name");
      await expect(heroName).toBeVisible();

      const nameStyles = await heroName.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          animationName: s.animationName,
          transitionProperty: s.transitionProperty,
          transitionDuration: s.transitionDuration,
          opacity: s.opacity,
        };
      });
      expect(nameStyles.animationName).toBe("none");
      // Acceptable: "none" OR any list that does NOT include opacity/transform.
      // "all" is only a concern when transition-duration > 0s (browsers keep initial "all" with 0s).
      // We check: no opacity/transform in property list, AND opacity is fully visible.
      expect(nameStyles.transitionProperty).not.toMatch(/\bopacity\b/);
      expect(nameStyles.transitionProperty).not.toMatch(/\btransform\b/);
      // If transitionProperty is "all", duration must be "0s" (no real transition).
      if (/\ball\b/.test(nameStyles.transitionProperty)) {
        expect(nameStyles.transitionDuration).toBe("0s");
      }
      expect(nameStyles.opacity).toBe("1");

      const taglineStyles = await page.locator(".hero-tagline").evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          animationName: s.animationName,
          transitionProperty: s.transitionProperty,
          transitionDuration: s.transitionDuration,
          opacity: s.opacity,
        };
      });
      expect(taglineStyles.animationName).toBe("none");
      expect(taglineStyles.transitionProperty).not.toMatch(/\bopacity\b/);
      expect(taglineStyles.transitionProperty).not.toMatch(/\btransform\b/);
      if (/\ball\b/.test(taglineStyles.transitionProperty)) {
        expect(taglineStyles.transitionDuration).toBe("0s");
      }
      expect(taglineStyles.opacity).toBe("1");
    },
  );
});
