import { test } from "@playwright/test";

// Wave 0 stubs — tests run RED until Plan 05-02 ships contact.astro + thanks.astro

test.describe("/contact page (CONT-01, CONT-02, CONT-03)", () => {
  test.todo("form renders with all four fields: name, email, subject, message");
  test.todo("form has data-netlify=\"true\" attribute");
  test.todo("form has action=\"/thanks\"");
  test.todo("submit button is visible and labeled 'Send message'");
  test.todo("submit button is initially disabled (Turnstile gate)");
  test.todo("contact card shows mailto link to shivansh.choudhary1997@gmail.com");
  test.todo("contact card shows LinkedIn link to linkedin.com/in/shivanshc248");
  test.todo("contact card shows GitHub link to github.com/skylark248");
  test.todo("phone number 917436069744 is NOT in initial page source (D-06)");
  test.todo("'Show phone' button is visible in contact card");
  test.todo("'Save my contact' link exists and href ends with shivansh.vcf");
});

test.describe("/thanks page (CONT-02)", () => {
  test.todo("page renders a confirmation heading");
  test.todo("page has a link back to home /");
  test.todo("page has noindex meta tag");
});
