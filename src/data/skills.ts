// src/data/skills.ts
// Single source of truth for landing-page skills (D-10).
// Category order is locked per D-11: Languages → Frameworks → Infra → Cloud → Data.
// heroSkills MUST be a strict subset of allSkills (D-13 — enforced by tests/unit/skills.test.ts).

export interface SkillCategory {
  category: "Languages" | "Frameworks" | "Infra" | "Cloud" | "Data";
  items: string[];
}

// D-11: do not reorder; the unit test asserts this exact ordering.
export const skills: SkillCategory[] = [
  { category: "Languages",  items: ["Java", "TypeScript", "Python", "SQL", "Bash"] },
  { category: "Frameworks", items: ["Spring Boot", "Astro", "React", "Node.js"] },
  { category: "Infra",      items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { category: "Cloud",      items: ["AWS", "Azure", "Netlify", "Render"] },
  { category: "Data",       items: ["PostgreSQL", "Redis", "Elasticsearch", "Apache Kafka"] },
];

// D-12: hero shows 3–5 curated tags drawn from the union.
// Tweaking this list is Claude's Discretion (CONTEXT.md §"Claude's Discretion"),
// but every entry MUST appear in `skills[].items` somewhere (D-13).
export const heroSkills: string[] = [
  "Java", "TypeScript", "Spring Boot", "Kubernetes", "AWS",
];

// Helper used by the subset invariant unit test (D-13).
export const allSkills: string[] = skills.flatMap((c) => c.items);
