import { test } from "@playwright/test";

// Wave 0 stubs — tests run RED until Plan 05-05 ships HamburgerMenu in BaseLayout
// All tests set viewport to 375x812 (mobile) where hamburger is visible

test.describe("Hamburger menu (D-18)", () => {
  test.todo("hamburger button #hamburger-toggle is visible on mobile viewport (375px)");
  test.todo("hamburger button has aria-expanded='false' initially");
  test.todo("hamburger button has aria-controls='mobile-menu-panel'");
  test.todo("hamburger button has aria-label='Open menu'");
  test.todo("clicking hamburger sets aria-expanded='true'");
  test.todo("clicking hamburger shows #mobile-menu-panel");
  test.todo("pressing Escape closes menu and sets aria-expanded='false'");
  test.todo("pressing Escape returns focus to hamburger button");
  test.todo("hamburger button is hidden on desktop viewport (1280px)");
  test.todo("all 7 nav links are inside mobile-menu-panel");
});
