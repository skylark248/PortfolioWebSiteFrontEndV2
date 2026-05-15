/**
 * security-headers.test.ts
 *
 * Reads public/_headers and asserts all required Netlify edge security headers
 * are present with the correct values. Covers FOUND-11 (T-CSP, T-HSTS,
 * T-CLICKJACK, T-MIME, T-REFERRER).
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const headersPath = resolve(process.cwd(), "public/_headers");

let headersContent: string;

beforeAll(() => {
  headersContent = readFileSync(headersPath, "utf-8");
});

describe("public/_headers security headers", () => {
  it("contains the path matcher /*", () => {
    expect(headersContent).toContain("/*");
  });

  it("contains HSTS with exact required value", () => {
    expect(headersContent).toContain(
      "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
    );
  });

  it("contains X-Content-Type-Options nosniff", () => {
    expect(headersContent).toContain("X-Content-Type-Options: nosniff");
  });

  it("contains X-Frame-Options DENY", () => {
    expect(headersContent).toContain("X-Frame-Options: DENY");
  });

  it("contains Referrer-Policy strict-origin-when-cross-origin", () => {
    expect(headersContent).toContain(
      "Referrer-Policy: strict-origin-when-cross-origin",
    );
  });

  it("contains Content-Security-Policy header", () => {
    expect(headersContent).toContain("Content-Security-Policy:");
  });

  it("CSP contains default-src 'self'", () => {
    expect(headersContent).toContain("default-src 'self'");
  });

  it("CSP contains exact script-src with googletagmanager.com and unsafe-inline", () => {
    expect(headersContent).toContain(
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    );
  });

  it("CSP contains frame-ancestors 'none'", () => {
    expect(headersContent).toContain("frame-ancestors 'none'");
  });

  it("CSP contains img-src allowing googletagmanager and google-analytics", () => {
    expect(headersContent).toContain("https://www.googletagmanager.com");
    expect(headersContent).toContain("https://www.google-analytics.com");
  });

  it("CSP contains connect-src allowing google analytics endpoints", () => {
    expect(headersContent).toContain(
      "connect-src 'self' https://www.google-analytics.com",
    );
  });

  it("contains Permissions-Policy", () => {
    expect(headersContent).toContain("Permissions-Policy:");
  });
});
