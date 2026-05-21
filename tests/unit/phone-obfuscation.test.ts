import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Wave 1 — upgraded from it.todo() stubs (Plan 05-02)
// Note: dist/contact/index.html assertions require pnpm build to run first.
// These tests run in the test:unit script context which includes a pre-build step
// when the dist/ directory exists. The src/ assertion does not require a build.

const contactAstroPath = resolve(process.cwd(), "src/pages/contact.astro");
const phoneRevealPath = resolve(process.cwd(), "src/components/contact/PhoneReveal.astro");

let contactContent: string;
let phoneRevealContent: string;

beforeAll(() => {
  contactContent = readFileSync(contactAstroPath, "utf-8");
  phoneRevealContent = readFileSync(phoneRevealPath, "utf-8");
});

describe("Phone obfuscation (D-06)", () => {
  it("src/pages/contact.astro does NOT contain literal phone number 917436069744", () => {
    expect(contactContent).not.toContain("917436069744");
  });
  it("src/components/contact/PhoneReveal.astro does NOT contain literal phone number 917436069744", () => {
    expect(phoneRevealContent).not.toContain("917436069744");
  });
  it("PhoneReveal.astro contains only the base64-encoded form of the phone number", () => {
    expect(phoneRevealContent).toContain("KzkxNzQzNjA2OTc0NA==");
  });
});
