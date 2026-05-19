/**
 * resume-schema.test.ts
 *
 * Mirrors src/data/resume.schema.ts — must stay in sync.
 *
 * The schema is inlined here so this test runs under Vitest without
 * `astro:content` resolution friction. If you change src/data/resume.schema.ts,
 * update this mirror accordingly.
 *
 * RES-01 + D-04: prevents future schema drift.
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";

// ─── Resume schema (mirrors src/data/resume.schema.ts) ──────────────────────

// JSON Resume's ISO8601 date format: "YYYY-MM-DD" | "YYYY-MM" | "YYYY"
const Iso8601Date = z
  .string()
  .regex(/^([1-2][0-9]{3}(-[0-1][0-9](-[0-3][0-9])?)?)$/, "must be ISO8601 (YYYY[-MM[-DD]])");

const Location = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
}).optional();

const Profile = z.object({
  network: z.string().optional(),
  username: z.string().optional(),
  url: z.string().url().optional(),
});

const Basics = z.object({
  name: z.string().optional(),
  label: z.string().optional(),
  image: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().optional(),
  location: Location,
  profiles: z.array(Profile).default([]),
});

const Work = z.object({
  name: z.string().optional(),
  position: z.string().optional(),
  url: z.string().url().optional(),
  startDate: Iso8601Date.optional(),
  endDate: Iso8601Date.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  location: z.string().optional(),
});

const Skill = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

const Project = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: Iso8601Date.optional(),
  endDate: Iso8601Date.optional(),
  url: z.string().url().optional(),
});

const Education = z.object({
  institution: z.string().optional(),
  url: z.string().url().optional(),
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: Iso8601Date.optional(),
  endDate: Iso8601Date.optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).default([]),
});

const Meta = z.object({
  canonical: z.string().url().optional(),
  version: z.string().optional(),
  lastModified: z.string().optional(),
}).optional();

const ResumeSchema = z.object({
  basics: Basics.optional(),
  work: z.array(Work).default([]),
  skills: z.array(Skill).default([]),
  projects: z.array(Project).default([]),
  education: z.array(Education).default([]),
  meta: Meta,
}).refine(
  (r) => {
    const name = r.basics?.name;
    return typeof name === "string" && name.trim().length > 0;
  },
  { message: "basics.name is required (renderer invariant — D-03)", path: ["basics", "name"] }
).refine(
  (r) => r.work.length >= 1,
  { message: "work[] must have at least one entry (renderer invariant — D-03)", path: ["work"] }
);

// ─── Resume schema tests ─────────────────────────────────────────────────────

describe("resume schema", () => {
  it("rejects when basics.name is missing", () => {
    const result = ResumeSchema.safeParse({
      work: [{ name: "Acme Corp", position: "Engineer" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects when work[] is empty but basics.name is set", () => {
    const result = ResumeSchema.safeParse({
      basics: { name: "Shivansh" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects when basics.email is not a valid email", () => {
    const result = ResumeSchema.safeParse({
      basics: { name: "Shivansh Choudhary", email: "not-an-email" },
      work: [{ name: "Acme Corp", position: "Engineer" }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts minimal valid input — basics.name + one work entry", () => {
    const result = ResumeSchema.safeParse({
      basics: { name: "Shivansh Choudhary" },
      work: [{ name: "Acme Corp", position: "Senior Engineer" }],
    });
    expect(result.success).toBe(true);
  });

  it("accepts full launch shape — all sections populated", () => {
    const result = ResumeSchema.safeParse({
      basics: {
        name: "Shivansh Choudhary",
        label: "Senior Software Engineer",
        email: "shivansh@example.com",
        phone: "+1-555-0100",
        url: "https://shivanshchoudhary.info",
        summary: "Full-stack engineer with 5+ years of experience.",
        location: { city: "San Francisco", countryCode: "US", region: "California" },
        profiles: [{ network: "LinkedIn", username: "shivansh", url: "https://linkedin.com/in/shivansh" }],
      },
      work: [
        {
          name: "Acme Corp",
          position: "Senior Software Engineer",
          url: "https://acme.example.com",
          startDate: "2022-01",
          endDate: "2026-05",
          summary: "Led backend services migration.",
          highlights: ["Reduced latency by 40%", "Owned on-call rotation"],
          location: "Remote",
        },
      ],
      skills: [
        { name: "TypeScript", level: "Expert", keywords: ["Node.js", "Astro"] },
      ],
      projects: [
        {
          name: "Portfolio Website",
          description: "Personal portfolio built with Astro.",
          highlights: ["Lighthouse 100"],
          keywords: ["Astro", "MDX"],
          startDate: "2026-01",
          url: "https://shivanshchoudhary.info",
        },
      ],
      education: [
        {
          institution: "State University",
          area: "Computer Science",
          studyType: "Bachelor",
          startDate: "2015-08",
          endDate: "2019-05",
        },
      ],
      meta: {
        version: "v1.0.0",
        lastModified: "2026-05-19T00:00:00Z",
      },
    });
    expect(result.success).toBe(true);
  });

  it("RED-MARKER: src/data/resume.schema.ts exists", async () => {
    // Wave 1 turns this GREEN by creating the file.
    const fs = await import("node:fs");
    expect(fs.existsSync("src/data/resume.schema.ts")).toBe(true);
  });
});
