import { test } from "@playwright/test";

// Wave 0 stubs — tests run RED until Plan 05-03 ships about.astro

test.describe("/about page (MISC-01)", () => {
  test.todo("h1 contains 'Shivansh Choudhary'");
  test.todo("StatusPill shows 'Currently @ Morgan Stanley'");
  test.todo("avatar image is visible");
  test.todo("'Now' section heading is present");
  test.todo("'Now' paragraph contains 'not actively job-hunting'");
  test.todo("primary CTA 'Get in touch' links to /contact");
  test.todo("secondary CTA 'Read my resume' links to /resume");
  test.todo("dual CTAs are side-by-side on desktop viewport (1280px)");
});
