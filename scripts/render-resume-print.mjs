/**
 * One-shot print-stylesheet spot-check.
 * Renders /resume to a PDF using browser print emulation, exactly as
 * Cmd/Ctrl + P from a real browser would. Writes to
 *   scripts/.print-check/resume-light-print.pdf
 *   scripts/.print-check/resume-light-print.png   (a screenshot in print media)
 *
 * Run with `node scripts/render-resume-print.mjs` while `pnpm dev` is up
 * on http://localhost:4321. Output dir is gitignored — verification only.
 */

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, ".print-check");
await mkdir(outDir, { recursive: true });

const URL_BASE = process.env.PRINT_CHECK_URL ?? "http://localhost:4321";

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${URL_BASE}/resume`, { waitUntil: "networkidle" });

  // Emulate print media so the @media print block applies in the screenshot too.
  await page.emulateMedia({ media: "print" });

  await page.screenshot({
    path: path.join(outDir, "resume-light-print.png"),
    fullPage: true,
  });

  await page.pdf({
    path: path.join(outDir, "resume-light-print.pdf"),
    format: "Letter",
    margin: { top: "0.5in", bottom: "0.5in", left: "0.6in", right: "0.6in" },
    printBackground: false,
  });

  console.log(`Wrote: ${outDir}/resume-light-print.pdf`);
  console.log(`Wrote: ${outDir}/resume-light-print.png`);
} finally {
  await browser.close();
}
