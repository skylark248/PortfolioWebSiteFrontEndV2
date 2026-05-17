import { test } from "@playwright/test";

/**
 * E2E tests for /case-studies listing page (PROJ-03).
 *
 * When promoted (Wave 2+), must:
 *  - Visit /case-studies and assert H1 is "Case Studies"
 *  - Assert each feature card shows: hero image (if present), title, subtitle, meta strip, description, outcome
 *  - Assert "Result: " prefix appears before outcome text (UI-SPEC)
 *  - Assert draft case studies are excluded
 *  - Assert empty state when no published case studies
 */
test.describe("/case-studies listing (PROJ-03)", () => {
  test.todo("renders H1 'Case Studies'");
  test.todo("feature cards show title, subtitle, meta strip, description, outcome");
  test.todo("outcome is prefixed with 'Result: ' (UI-SPEC)");
  test.todo("draft case studies are excluded");
  test.todo("shows empty state when no published case studies");
});
