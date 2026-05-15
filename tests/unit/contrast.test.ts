/**
 * contrast.test.ts
 * WCAG 2.x contrast ratio verification for D-06 palette pairs.
 * Covers requirement FOUND-04.
 *
 * Pairs to verify:
 *   Light: bg #FAF7F2 × ink #1A1A1A (body text ≥ 4.5:1)
 *   Light: bg #FAF7F2 × muted #6B6B6B (large text ≥ 3:1)
 *   Dark:  bg #15151A × ink #ECECEC  (body text ≥ 4.5:1)
 *   Dark:  bg #15151A × muted #9A9A9A (large text ≥ 3:1)
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ──────────────────────────────────────────────
// WCAG 2.x contrast ratio helper (inline, no extra package)
// ──────────────────────────────────────────────

/** Convert a hex color string (e.g. "#FAF7F2") to its sRGB components [0..1]. */
function hexToSrgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}

/** Linearize an sRGB component (IEC 61966-2-1). */
function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Compute relative luminance from a hex color (WCAG 2.x formula). */
function relativeLuminance(hex: string): number {
  const [rs, gs, bs] = hexToSrgb(hex);
  const r = linearize(rs);
  const g = linearize(gs);
  const b = linearize(bs);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Compute WCAG contrast ratio between two colors. */
function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ──────────────────────────────────────────────
// Tests
// ──────────────────────────────────────────────

describe("D-06 palette WCAG AA contrast", () => {
  // Light mode
  describe("Light mode", () => {
    const bg = "#FAF7F2";

    it("light bg × ink (#1A1A1A) meets ≥ 4.5:1 (body text)", () => {
      const ink = "#1A1A1A";
      const ratio = contrastRatio(bg, ink);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it("light bg × muted (#6B6B6B) meets ≥ 3:1 (large text)", () => {
      const muted = "#6B6B6B";
      const ratio = contrastRatio(bg, muted);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  // Dark mode
  describe("Dark mode", () => {
    const bg = "#15151A";

    it("dark bg × ink (#ECECEC) meets ≥ 4.5:1 (body text)", () => {
      const ink = "#ECECEC";
      const ratio = contrastRatio(bg, ink);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it("dark bg × muted (#9A9A9A) meets ≥ 3:1 (large text)", () => {
      const muted = "#9A9A9A";
      const ratio = contrastRatio(bg, muted);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  // Accent tokens present in theme.css (spot-check — ensures the file exists)
  describe("theme.css contains all D-06 hex values", () => {
    const THEME_CSS_PATH = resolve(
      process.cwd(),
      "src/styles/theme.css",
    );

    let themeContent: string;

    try {
      themeContent = readFileSync(THEME_CSS_PATH, "utf-8");
    } catch {
      themeContent = ""; // Will fail assertions below — RED confirmed
    }

    const required = [
      "#FAF7F2",
      "#1A1A1A",
      "#3D348B",
      "#6B6B6B",
      "#15151A",
      "#ECECEC",
      "#8B83FF",
      "#9A9A9A",
    ];

    for (const hex of required) {
      it(`theme.css contains ${hex}`, () => {
        expect(themeContent).toContain(hex);
      });
    }
  });
});
