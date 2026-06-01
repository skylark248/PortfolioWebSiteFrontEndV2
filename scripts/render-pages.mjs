/**
 * Visual spot-check helper.
 * Renders a list of pages (default: landing) at desktop + mobile widths and
 * dumps screenshots into scripts/.print-check/ (which is gitignored).
 *
 * Usage:
 *   node scripts/render-pages.mjs                       # landing only
 *   node scripts/render-pages.mjs /about /contact       # specific paths
 *   PRINT_CHECK_URL=http://localhost:1234 node ...      # custom base URL
 *
 * Requires `pnpm dev` running on http://localhost:4321.
 */

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, ".print-check");
await mkdir(outDir, { recursive: true });

const URL_BASE = process.env.PRINT_CHECK_URL ?? "http://localhost:4321";
const paths = process.argv.slice(2);
const targets = paths.length > 0 ? paths : ["/"];

const sizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile",  width: 390,  height: 844 },
];

const browser = await chromium.launch();
try {
  for (const target of targets) {
    for (const size of sizes) {
      const ctx = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        // Emulate prefers-reduced-motion so scroll-driven reveals (SectionFade,
        // future scroll-timeline animations) snap to their final visible state
        // for the screenshot. Layout/color verification only — motion is
        // verified by other means.
        reducedMotion: "reduce",
      });
      const page = await ctx.newPage();
      await page.goto(`${URL_BASE}${target}`, { waitUntil: "networkidle" });

      const slug = target.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
      const file = path.join(outDir, `${slug}-${size.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`Wrote: ${file}`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}
