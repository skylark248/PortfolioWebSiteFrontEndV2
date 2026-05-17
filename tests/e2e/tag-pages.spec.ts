import { test } from "@playwright/test";

/**
 * E2E tests for per-collection tag index pages (D-12).
 *
 * When promoted (Wave 2+), must:
 *  - Visit /blog/tags/[tag] and assert filtered posts for that tag are listed
 *  - Assert description line "All posts tagged {tag} — N entries" is present (UI-SPEC)
 *  - Visit /projects/tags/[tag] and assert filtered projects for that tag
 *  - Visit /case-studies/tags/[tag] and assert filtered case studies for that tag
 *  - Assert a tag with 1 entry renders without crash
 *  - Assert no cross-collection mixing (blog tag page only shows blog posts, D-12)
 */
test.describe("Per-collection tag index pages (D-12)", () => {
  test.todo("/blog/tags/[tag] renders filtered posts for tag");
  test.todo("tag description line shows 'All posts tagged {tag} — N entries'");
  test.todo("/projects/tags/[tag] renders filtered projects");
  test.todo("/case-studies/tags/[tag] renders filtered case studies");
  test.todo("tag with 1 entry renders without crash");
  test.todo("no cross-collection mixing on tag pages");
});
