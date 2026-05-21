import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Wave 1 — upgraded from it.todo() stubs (Plan 05-02)

const formsHtmlPath = resolve(process.cwd(), "public/__forms.html");
const contactAstroPath = resolve(process.cwd(), "src/pages/contact.astro");
const vcfPath = resolve(process.cwd(), "public/shivansh.vcf");

let formsContent: string;
let contactContent: string;
let vcfContent: string;

beforeAll(() => {
  formsContent = readFileSync(formsHtmlPath, "utf-8");
  contactContent = readFileSync(contactAstroPath, "utf-8");
  vcfContent = readFileSync(vcfPath, "utf-8");
});

describe("public/__forms.html (CONT-04)", () => {
  it('exists and contains data-netlify="true"', () => {
    expect(formsContent).toContain('data-netlify="true"');
  });
  it('contains name="contact"', () => {
    expect(formsContent).toContain('name="contact"');
  });
  it("contains all four field names: name, email, subject, message", () => {
    expect(formsContent).toContain('name="name"');
    expect(formsContent).toContain('name="email"');
    expect(formsContent).toContain('name="subject"');
    expect(formsContent).toContain('name="message"');
  });
  it('contains hidden form-name input with value="contact"', () => {
    expect(formsContent).toContain('name="form-name"');
    expect(formsContent).toContain('value="contact"');
  });
  it("contains netlify-honeypot attribute", () => {
    expect(formsContent).toContain("data-netlify-honeypot");
  });
});

describe("src/pages/contact.astro form attributes (CONT-01)", () => {
  it('form element has data-netlify="true"', () => {
    expect(contactContent).toContain('data-netlify="true"');
  });
  it('form element has action="/thanks"', () => {
    expect(contactContent).toContain('action="/thanks"');
  });
  it('form element has data-netlify-honeypot="bot-field"', () => {
    expect(contactContent).toContain('data-netlify-honeypot="bot-field"');
  });
  it('form contains hidden input name="form-name" value="contact"', () => {
    expect(contactContent).toContain('name="form-name"');
    expect(contactContent).toContain('value="contact"');
  });
  it("form has four required fields: name, email, subject, message", () => {
    expect(contactContent).toContain('name="name"');
    expect(contactContent).toContain('name="email"');
    expect(contactContent).toContain('name="subject"');
    expect(contactContent).toContain('name="message"');
  });
});

describe("public/shivansh.vcf (D-09)", () => {
  it("file exists", () => {
    expect(vcfContent).toBeTruthy();
  });
  it("contains VERSION:3.0", () => {
    expect(vcfContent).toContain("VERSION:3.0");
  });
  it("contains BEGIN:VCARD and END:VCARD", () => {
    expect(vcfContent).toContain("BEGIN:VCARD");
    expect(vcfContent).toContain("END:VCARD");
  });
  it("contains FN:Shivansh Choudhary", () => {
    expect(vcfContent).toContain("FN:Shivansh Choudhary");
  });
  it("does NOT contain phone number +917436069744", () => {
    expect(vcfContent).not.toContain("917436069744");
    expect(vcfContent).not.toContain("TEL");
  });
});
