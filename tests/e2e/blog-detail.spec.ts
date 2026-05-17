import { test } from "@playwright/test";

/**
 * E2E tests for /blog/[slug] detail page (BLOG-02).
 *
 * When promoted (Wave 2+), must:
 *  - Visit a blog post and assert title, date, reading time, tags visible in header
 *  - Assert heading anchors are present and have tabIndex=0 (keyboard accessible, D-04)
 *  - Assert heading anchors do NOT have aria-hidden="true" (D-04 + WCAG 2.1 AA)
 *  - Assert code blocks are rendered by Expressive Code (has .expressive-code class)
 *  - Assert prev/next navigation is present (D-05)
 *  - Assert hero image renders via astro:assets when heroImage is set
 */
test.describe("/blog/[slug] detail (BLOG-02)", () => {
  test.todo("renders title, date, reading time, tags in header (D-06)");
  test.todo("heading anchors are in tab order — tabIndex=0, no ariaHidden (D-04)");
  test.todo("code blocks have .expressive-code class (D-20)");
  test.todo("prev/next navigation is present (D-05)");
  test.todo("hero image renders when present");
  test.todo("renders without hero image when heroImage is absent");
});
