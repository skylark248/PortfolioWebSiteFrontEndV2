// src/data/resume.ts
// Single source of truth loader for the resume system (D-01 / D-02).
// Parse-once at module load — throws on invalid JSON and fails `pnpm build` + `pnpm dev`.
// D-02: renderer imports `resume` from this module ONLY — never imports resume.json directly.

import raw from "./resume.json";
import { ResumeSchema, type Resume } from "./resume.schema";

export const resume: Resume = ResumeSchema.parse(raw);
