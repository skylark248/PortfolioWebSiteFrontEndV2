// src/data/resume.schema.ts
// Zod mirror of JSON Resume v1.0.0 — source: https://jsonresume.org/schema/
// D-01: schema mirror; build fails on invalid JSON via .parse() in src/data/resume.ts.
// D-03: renderer invariants (basics.name + work.length >= 1) enforced via .refine().
// D-05: curated core only; unknown top-level sections silently dropped (default Zod behavior).

import { z } from "zod";

// JSON Resume's ISO8601 date format: "YYYY-MM-DD" | "YYYY-MM" | "YYYY"
const Iso8601Date = z
  .string()
  .regex(/^([1-2][0-9]{3}(-[0-1][0-9](-[0-3][0-9])?)?)$/, "must be ISO8601 (YYYY[-MM[-DD]])");

const Location = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(), // e.g., "IN"
  region: z.string().optional(),
}).optional();

const Profile = z.object({
  network: z.string().optional(),
  username: z.string().optional(),
  url: z.string().url().optional(),
});

const Basics = z.object({
  name: z.string().optional(),       // spec: optional. Renderer-invariant tightens to required.
  label: z.string().optional(),      // jobTitle for JSON-LD
  image: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().optional(),
  location: Location,
  profiles: z.array(Profile).default([]),
});

const Work = z.object({
  name: z.string().optional(),       // company name
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
  area: z.string().optional(),      // field of study
  studyType: z.string().optional(), // degree type
  startDate: Iso8601Date.optional(),
  endDate: Iso8601Date.optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).default([]),
});

const Meta = z.object({
  canonical: z.string().url().optional(),
  version: z.string().optional(),
  lastModified: z.string().optional(), // ISO8601 datetime
}).optional();

// Top-level — D-05: curated core only. Unknown sections ignored (not errored).
// Default Zod object behaviour DROPS unknown keys; that satisfies "ignored, not error" for D-05.
export const ResumeSchema = z.object({
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

export type Resume = z.infer<typeof ResumeSchema>;
