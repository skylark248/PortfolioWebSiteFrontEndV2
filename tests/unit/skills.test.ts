import { describe, it, expect } from "vitest";
import { heroSkills, allSkills, skills } from "../../src/data/skills";

// ─── Skills module tests (D-10, D-11, D-12, D-13) ──────────────────────────
describe("skills module (D-10, D-11, D-12, D-13)", () => {
  it("heroSkills is a strict subset of all skill items (D-13)", () => {
    for (const skill of heroSkills) {
      expect(allSkills).toContain(skill);
    }
  });

  it("heroSkills has 3–5 items (D-12)", () => {
    expect(heroSkills.length).toBeGreaterThanOrEqual(3);
    expect(heroSkills.length).toBeLessThanOrEqual(5);
  });

  it("categories appear in locked order: Languages → Frameworks → Infra → Cloud → Data (D-11)", () => {
    const order = ["Languages", "Frameworks", "Infra", "Cloud", "Data"];
    expect(skills.map((c) => c.category)).toEqual(order);
  });

  it("each category has 3–7 items", () => {
    for (const cat of skills) {
      expect(cat.items.length).toBeGreaterThanOrEqual(3);
      expect(cat.items.length).toBeLessThanOrEqual(7);
    }
  });
});
