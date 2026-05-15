/**
 * content-schema.test.ts
 *
 * Mirrors src/content.config.ts schemas — must stay in sync.
 *
 * These schemas are inlined to avoid Astro-runtime import friction in Vitest.
 * If you change src/content.config.ts, update these mirrors accordingly.
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";

// ─── Blog schema (mirrors src/content.config.ts) ───────────────────────────
const blogSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

// ─── Projects schema (mirrors src/content.config.ts) ───────────────────────
const projectsSchema = z.object({
  title: z.string().min(1).max(80),
  summary: z.string().min(1).max(200),
  pubDate: z.coerce.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

// ─── Case Studies schema (mirrors src/content.config.ts) ───────────────────
const caseStudiesSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  pubDate: z.coerce.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  role: z.string().optional(),
  timeline: z.string().optional(),
});

// ─── Blog schema tests ──────────────────────────────────────────────────────
describe("blog schema", () => {
  it("rejects when title is a number", () => {
    const result = blogSchema.safeParse({
      title: 123,
      description: "Valid description",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when title is missing", () => {
    const result = blogSchema.safeParse({
      description: "Valid description",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when pubDate is missing", () => {
    const result = blogSchema.safeParse({
      title: "Valid Title",
      description: "Valid description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when description is missing", () => {
    const result = blogSchema.safeParse({
      title: "Valid Title",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when description exceeds 160 chars", () => {
    const result = blogSchema.safeParse({
      title: "Valid Title",
      description: "a".repeat(161),
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid blog frontmatter", () => {
    const result = blogSchema.safeParse({
      title: "My Blog Post",
      description: "A valid description.",
      pubDate: "2026-05-15",
      draft: false,
      tags: ["engineering"],
    });
    expect(result.success).toBe(true);
  });
});

// ─── Projects schema tests ──────────────────────────────────────────────────
describe("projects schema", () => {
  it("rejects when title is a number", () => {
    const result = projectsSchema.safeParse({
      title: 42,
      summary: "Valid summary",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when title is missing", () => {
    const result = projectsSchema.safeParse({
      summary: "Valid summary",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when pubDate is missing", () => {
    const result = projectsSchema.safeParse({
      title: "Valid Title",
      summary: "Valid summary",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when summary exceeds 200 chars", () => {
    const result = projectsSchema.safeParse({
      title: "Valid Title",
      summary: "a".repeat(201),
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid repoUrl", () => {
    const result = projectsSchema.safeParse({
      title: "Valid Title",
      summary: "Valid summary",
      pubDate: "2026-05-15",
      repoUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid projects frontmatter", () => {
    const result = projectsSchema.safeParse({
      title: "My Project",
      summary: "A valid summary.",
      pubDate: "2026-05-15",
      draft: false,
      tags: ["typescript"],
      featured: true,
    });
    expect(result.success).toBe(true);
  });
});

// ─── Case Studies schema tests ──────────────────────────────────────────────
describe("caseStudies schema", () => {
  it("rejects when title is a number", () => {
    const result = caseStudiesSchema.safeParse({
      title: 99,
      description: "Valid description",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when title is missing", () => {
    const result = caseStudiesSchema.safeParse({
      description: "Valid description",
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when pubDate is missing", () => {
    const result = caseStudiesSchema.safeParse({
      title: "Valid Title",
      description: "Valid description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when description exceeds 200 chars", () => {
    const result = caseStudiesSchema.safeParse({
      title: "Valid Title",
      description: "a".repeat(201),
      pubDate: "2026-05-15",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid caseStudies frontmatter", () => {
    const result = caseStudiesSchema.safeParse({
      title: "My Case Study",
      description: "A valid description.",
      pubDate: "2026-05-15",
      draft: false,
      tags: ["systems"],
      role: "Lead Engineer",
    });
    expect(result.success).toBe(true);
  });
});
