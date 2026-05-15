import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Resolve the workflow file path relative to the project root
const workflowPath = path.resolve(__dirname, "../../.github/workflows/ci.yml");

describe("CI workflow shape", () => {
  let content: string;

  // Read the file once (will throw if missing — intentional RED failure)
  try {
    content = fs.readFileSync(workflowPath, "utf-8");
  } catch {
    content = "";
  }

  it("workflow file exists", () => {
    expect(fs.existsSync(workflowPath)).toBe(true);
  });

  it("workflow is named CI", () => {
    expect(content).toContain("name: CI");
  });

  it("triggers on push to main", () => {
    expect(content).toContain("push:");
    expect(content).toContain("[main]");
  });

  it("triggers on pull_request", () => {
    expect(content).toContain("pull_request:");
  });

  it("has a quality job", () => {
    expect(content).toContain("quality:");
  });

  it("has an e2e job", () => {
    expect(content).toContain("e2e:");
  });

  it("has an lhci job", () => {
    expect(content).toContain("lhci:");
  });

  it("quality job runs pnpm astro check", () => {
    expect(content).toContain("pnpm astro check");
  });

  it("quality job runs pnpm lint", () => {
    expect(content).toContain("pnpm lint");
  });

  it("quality job runs pnpm typecheck", () => {
    expect(content).toContain("pnpm typecheck");
  });

  it("quality job runs pnpm test:unit", () => {
    expect(content).toContain("pnpm test:unit");
  });

  it("quality job runs pnpm build", () => {
    expect(content).toContain("pnpm build");
  });

  it("e2e job installs playwright chromium", () => {
    expect(content).toContain("pnpm exec playwright install --with-deps chromium");
  });

  it("e2e job runs pnpm test:e2e", () => {
    expect(content).toContain("pnpm test:e2e");
  });

  it("lhci job runs lhci autorun", () => {
    expect(content).toContain("lhci autorun");
  });

  it("e2e job depends on quality", () => {
    // needs: quality must appear in the e2e job section
    // The workflow has e2e: ... needs: quality
    const e2eSection = content.slice(content.indexOf("e2e:"));
    expect(e2eSection).toContain("needs: quality");
  });

  it("lhci job depends on quality", () => {
    const lhciSection = content.slice(content.indexOf("lhci:"));
    expect(lhciSection).toContain("needs: quality");
  });
});
