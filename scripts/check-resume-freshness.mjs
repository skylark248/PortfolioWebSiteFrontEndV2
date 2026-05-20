/**
 * check-resume-freshness.mjs
 *
 * D-20 — uses git-log commit timestamps (not filesystem mtime, which actions/checkout doesn't preserve).
 * D-21 — runs in the `quality` job of .github/workflows/ci.yml.
 * D-22 — failure message text below is locked verbatim by 04-CONTEXT.md D-22 (per 2026-05-20 Pivot Addendum).
 *
 * Run in CI: `node scripts/check-resume-freshness.mjs`
 * Exits 0 when public/resume.pdf is at least as recent as src/data/resume.json by git-log timestamp.
 * Exits 1 otherwise (with the D-22 ritual-pointing message that links to docs/resume-ritual.md).
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const JSON_PATH = "src/data/resume.json";
const PDF_PATH = "public/resume.pdf";

function lastCommit(path) {
  if (!existsSync(path)) return null;
  const out = execSync(`git log -1 --format="%ct %H %ad" --date=iso -- ${path}`, {
    encoding: "utf8",
  }).trim();
  if (!out) return null;
  const [ct, sha, ...dateParts] = out.split(" ");
  return { ct: Number(ct), sha, date: dateParts.join(" ") };
}

const jsonInfo = lastCommit(JSON_PATH);
const pdfInfo = lastCommit(PDF_PATH);

if (!jsonInfo) {
  console.error(`❌ ${JSON_PATH} not tracked in git — cannot verify freshness.`);
  process.exit(1);
}
if (!pdfInfo) {
  console.error(
    `❌ ${PDF_PATH} not tracked in git. Commit a hand-crafted PDF once and keep it refreshed:\n` +
      `   See docs/resume-ritual.md — edit the external source document, re-export ${PDF_PATH}, commit.`
  );
  process.exit(1);
}

if (jsonInfo.ct > pdfInfo.ct) {
  console.error(
    `❌ ${JSON_PATH} was last touched in ${jsonInfo.sha} at ${jsonInfo.date}, but ${PDF_PATH} is older (${pdfInfo.sha} at ${pdfInfo.date}).\n` +
      `   Refresh the PDF per docs/resume-ritual.md:\n` +
      `   1. Edit your external source document (Word / Pages / Google Docs) to match the resume.json change.\n` +
      `   2. Re-export the PDF and overwrite public/resume.pdf.\n` +
      `   3. Commit public/resume.pdf in the same PR as your resume.json change.`
  );
  process.exit(1);
}

console.log(`✅ ${PDF_PATH} is up to date (${pdfInfo.date}) relative to ${JSON_PATH} (${jsonInfo.date}).`);
