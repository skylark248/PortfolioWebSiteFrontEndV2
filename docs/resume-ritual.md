# Resume Refresh Ritual

The on-site resume at `/resume` is rendered from `src/data/resume.json`. The downloadable PDF at `/resume.pdf` is a separately authored, hand-crafted artifact (see "Why hand-crafted" below). Whenever you edit `resume.json`, you MUST also refresh `public/resume.pdf` in the same pull request. CI enforces this via `scripts/check-resume-freshness.mjs` — the PR will fail if the JSON commit is newer than the PDF commit.

## How to refresh the PDF

1. Open your external source document (Word / Pages / Google Docs / LaTeX — whichever you used to author the original `public/resume.pdf`). The source lives outside this repo; keep it somewhere durable (cloud drive, personal archive).
2. Apply the same edits you made to `src/data/resume.json` — keep the two artifacts in sync content-wise. The JSON drives the on-site reading surface; the PDF is what recruiters download.
3. Export the document to PDF. Verify before committing:
   - File size < 1 MB (RES-03)
   - Text is selectable (Cmd-A → paste yields readable text, not garbled bytes)
   - ATS-friendly: real text, single-column body, standard section headings
4. Overwrite `portfolio-website-v2/public/resume.pdf` with the new export.
5. Commit `resume.json` and `public/resume.pdf` together in the same PR.

## Why hand-crafted (and not print-CSS-from-/resume)

Phase 4 originally locked a "print-CSS-first" ritual: open `/resume` in a browser, use the browser print dialog, save as PDF, commit. That was tried during Wave 3 execution and abandoned — the auto-rendered PDF could not be constrained to a single page at acceptable quality even with aggressive CSS trims (hidden roles, capped bullets, hidden projects). The hand-crafted approach trades the single-source-of-truth guarantee for control over typography, layout polish, and ATS structure. The CI freshness gate (this script) replaces the single-source guarantee with a discipline guarantee: the PDF cannot be older than `resume.json`. See `.planning/phases/04-resume-system/04-CONTEXT.md` "Pivot Addendum — 2026-05-20" for the full record of which decisions were superseded (D-08, D-18, D-23).

## Rollback rule (always-on)

`public/resume.pdf` must be refreshed whenever `resume.json` changes. Even a typo fix in a bullet point requires a PDF refresh — CI's `scripts/check-resume-freshness.mjs` will block the PR otherwise. If you cannot refresh the PDF in the same PR (lost source document, etc.), the path forward is to revert the `resume.json` change rather than bypass the gate.

See also:

- [`scripts/check-resume-freshness.mjs`](../scripts/check-resume-freshness.mjs) — the CI gate
- [`.planning/phases/04-resume-system/04-CONTEXT.md`](../../.planning/phases/04-resume-system/04-CONTEXT.md) — full phase context including the pivot addendum
- JSON Resume v1.0.0 spec: <https://jsonresume.org/schema/>
