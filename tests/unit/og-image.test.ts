/**
 * og-image.test.ts
 *
 * Asserts public/og-default.png exists, is exactly 1200×630, and has
 * non-uniform pixel data (guards against a blank/solid-color silent pass).
 * Covers SEO-02.
 */

import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { resolve } from "node:path";

const ogImagePath = resolve(process.cwd(), "public/og-default.png");

describe("public/og-default.png", () => {
  it("exists and has dimensions 1200×630", async () => {
    const metadata = await sharp(ogImagePath).metadata();
    expect(metadata.width).toBe(1200);
    expect(metadata.height).toBe(630);
  });

  it("has non-uniform pixel data (not a solid blank image)", async () => {
    const stats = await sharp(ogImagePath).stats();
    // At least one channel should have a meaningful range (max - min > 10)
    // This guards against a blank single-color image silently passing.
    const channels = stats.channels;
    const hasNonUniform = channels.some((ch) => ch.max - ch.min > 10);
    expect(hasNonUniform).toBe(true);
  });
});
