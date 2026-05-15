/**
 * netlify-config.test.ts
 *
 * Reads netlify.toml (at root of portfolio-website-v2/) and asserts the
 * required build command, publish directory, Node version, and pnpm version
 * are present. Covers FOUND-10.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const netlifyTomlPath = resolve(process.cwd(), "netlify.toml");

let tomlContent: string;

beforeAll(() => {
  tomlContent = readFileSync(netlifyTomlPath, "utf-8");
});

describe("netlify.toml", () => {
  it("declares build command as pnpm build", () => {
    expect(tomlContent).toContain('command = "pnpm build"');
  });

  it("declares publish directory as dist", () => {
    expect(tomlContent).toContain('publish = "dist"');
  });

  it("declares NODE_VERSION = 22", () => {
    expect(tomlContent).toContain('NODE_VERSION = "22"');
  });

  it("declares PNPM_VERSION", () => {
    expect(tomlContent).toContain("PNPM_VERSION");
  });

  it("has a [build] table section", () => {
    expect(tomlContent).toContain("[build]");
  });

  it("has a [build.environment] section", () => {
    expect(tomlContent).toContain("[build.environment]");
  });
});
