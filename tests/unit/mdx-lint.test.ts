import { describe, it } from "vitest";

/**
 * Tests for bare <img> prohibition in MDX content files (PROJ-06).
 *
 * When promoted to real tests (Wave 2+), they must:
 *  - Read all .mdx files under src/content/
 *  - Assert no file contains a bare <img src= element (not inside a component)
 *  - The <Figure> component is the only permitted image mechanism
 *
 * Edge cases:
 *  - Markdown image syntax ![alt](./path) is permitted (astro:assets handles it)
 *  - <img> inside MDX comments is not a violation
 *  - <Figure> component usage is not a violation
 */
describe("MDX image lint — no bare <img> (PROJ-06)", () => {
  it.todo("no MDX file in src/content/ contains a bare <img src= element");
  it.todo("Markdown image syntax ![]() is allowed");
  it.todo("<Figure> component usage is allowed");
});
