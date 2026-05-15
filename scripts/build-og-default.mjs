/**
 * build-og-default.mjs
 *
 * Generates public/og-default.png — a 1200×630 static OG image using Sharp.
 * D-06 palette: paper bg #FAF7F2, deep indigo accent #3D348B, ink #1A1A1A.
 *
 * Run once: node scripts/build-og-default.mjs
 * The output PNG is committed to public/og-default.png.
 */

import sharp from "sharp";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/og-default.png");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="100%" height="100%" fill="#FAF7F2"/>
  <!-- accent bar at bottom -->
  <rect x="0" y="570" width="1200" height="60" fill="#3D348B"/>
  <!-- headline -->
  <text x="80" y="260" font-family="Inter, system-ui, sans-serif" font-size="84" font-weight="700" fill="#1A1A1A">Shivansh Choudhary</text>
  <!-- sub-headline -->
  <text x="80" y="360" font-family="Inter, system-ui, sans-serif" font-size="40" fill="#3D348B">Software Engineer · Portfolio</text>
  <!-- domain -->
  <text x="80" y="550" font-family="Inter, system-ui, sans-serif" font-size="28" fill="#6B6B6B">shivanshchoudhary.info</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outputPath);

console.log(`OG image generated: ${outputPath}`);
