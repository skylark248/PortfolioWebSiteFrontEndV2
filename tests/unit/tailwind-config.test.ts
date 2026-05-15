import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const projectRoot = resolve(__dirname, "../..");

describe("Tailwind v4 configuration (FOUND-02)", () => {
  it("@tailwindcss/vite is present in dependencies", () => {
    const pkg = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf-8"));
    const allDeps = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
    };
    expect(Object.keys(allDeps)).toContain("@tailwindcss/vite");
  });

  it("@astrojs/tailwind is NOT present in dependencies (v3 wrapper must be absent)", () => {
    const pkg = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf-8"));
    const allDeps = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
    };
    expect(Object.keys(allDeps)).not.toContain("@astrojs/tailwind");
  });

  it('astro.config.mjs imports tailwindcss from "@tailwindcss/vite"', () => {
    const config = readFileSync(resolve(projectRoot, "astro.config.mjs"), "utf-8");
    expect(config).toContain('from "@tailwindcss/vite"');
  });

  it("astro.config.mjs calls tailwindcss() in vite.plugins", () => {
    const config = readFileSync(resolve(projectRoot, "astro.config.mjs"), "utf-8");
    expect(config).toContain("tailwindcss()");
  });
});
