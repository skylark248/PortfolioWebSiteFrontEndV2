import { test } from "@playwright/test";

/**
 * E2E tests for /projects/[slug] detail page (PROJ-02).
 *
 * When promoted (Wave 2+), must:
 *  - Visit a project detail page and assert title is visible
 *  - Assert MDX prose content is rendered (not empty)
 *  - Assert hero image renders via astro:assets when heroImage is set
 *  - Assert repo/demo links render with correct aria-labels
 *  - Assert tech tag chips are present
 */
test.describe("/projects/[slug] detail (PROJ-02)", () => {
  test.todo("renders project title");
  test.todo("renders MDX prose content");
  test.todo("hero image renders when present");
  test.todo("repo link has aria-label 'View source on GitHub'");
  test.todo("demo link has aria-label 'View live demo'");
});
