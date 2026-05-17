import { describe, it } from "vitest";

/**
 * Tests for getPublishedCollection draft filter helper (D-14, BLOG-01, BLOG-05).
 *
 * When these stubs are promoted to real tests (Wave 2+), they must:
 *  - Mock getCollection to return entries with draft:true and draft:false
 *  - Assert that in PROD mode (import.meta.env.PROD = true), draft entries are excluded
 *  - Assert that in DEV mode (import.meta.env.PROD = false), all entries are returned
 *  - Cover the blog, projects, and caseStudies collections
 */
describe("getPublishedCollection", () => {
  it.todo("returns only non-draft entries in production mode (BLOG-05)");
  it.todo("returns all entries including drafts in dev mode (BLOG-01 dev preview)");
  it.todo("works for blog collection");
  it.todo("works for projects collection");
  it.todo("works for caseStudies collection");
  it.todo("returns empty array when all entries are drafts in production");
});
