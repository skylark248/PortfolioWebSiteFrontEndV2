import { test } from "@playwright/test";

/**
 * E2E tests for /projects listing page (PROJ-01).
 *
 * When promoted (Wave 2+), must:
 *  - Visit /projects and assert H1 is "Projects"
 *  - Assert featured projects appear before non-featured (D-02)
 *  - Assert horizontal-rule separator appears between featured and non-featured sections
 *  - Assert each card shows title, summary, tag chips, link icons where applicable
 *  - Assert project cards are in a CSS grid layout
 *  - Assert draft projects are excluded
 */
test.describe("/projects listing (PROJ-01)", () => {
  test.todo("renders H1 'Projects'");
  test.todo("featured projects appear before non-featured (D-02)");
  test.todo("separator line exists between featured and non-featured sections");
  test.todo("each card shows title, summary, tag chips");
  test.todo("draft projects are excluded");
});
