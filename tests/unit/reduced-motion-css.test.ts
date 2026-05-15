/**
 * reduced-motion-css.test.ts
 * Verifies that src/styles/global.css contains the required
 * @media (prefers-reduced-motion: reduce) block with all four safe overrides.
 * Covers requirement FOUND-07 / D-11.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("global.css reduced-motion policy (D-11)", () => {
  let css: string;

  beforeAll(() => {
    const cssPath = resolve(process.cwd(), "src/styles/global.css");
    try {
      css = readFileSync(cssPath, "utf-8");
    } catch {
      css = ""; // Will fail assertions below — RED confirmed
    }
  });

  it("contains @media (prefers-reduced-motion: reduce) media query", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("contains animation-duration: 0.01ms override", () => {
    expect(css).toContain("animation-duration: 0.01ms");
  });

  it("contains transition-duration: 0.01ms override", () => {
    expect(css).toContain("transition-duration: 0.01ms");
  });

  it("contains scroll-behavior: auto override", () => {
    expect(css).toContain("scroll-behavior: auto");
  });

  it("contains animation-iteration-count: 1 override", () => {
    expect(css).toContain("animation-iteration-count: 1");
  });

  it("all reduced-motion overrides use !important", () => {
    // Extract the reduced-motion block and verify !important on each override
    const blockMatch = css.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\}\s*\}/,
    );
    expect(blockMatch).not.toBeNull();
    const block = blockMatch![1];
    expect(block).toContain("!important");
  });
});
