import { test } from "@playwright/test";

// Wave 0 stubs — tests run RED until Plan 05-04 ships 404.astro
// NOTE: Playwright navigates to a non-existent path to trigger 404

test.describe("/404 page (MISC-02)", () => {
  test.todo("returns HTTP 404 status for unknown path");
  test.todo("h1 contains 'wandered off'");
  test.todo("nav link to / (Home) is present");
  test.todo("nav link to /blog is present");
  test.todo("nav link to /projects is present");
  test.todo("nav link to /case-studies is present");
  test.todo("nav link to /contact is present");
});
