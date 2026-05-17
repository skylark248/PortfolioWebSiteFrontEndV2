# Case Study Authoring Guide

This directory contains long-form case study entries. Each file is an `.mdx` file rendered at `/case-studies/[slug]/`.

## Required Frontmatter

All case studies must include these fields (Zod-validated at build time):

```yaml
---
title: "Project or initiative name"          # max 100 chars
subtitle: "One-line framing of the work"     # max 80 chars — shown on listing card
description: "2-3 sentence summary"          # max 200 chars — excerpt + OG description
outcome: "Quantified one-line result"        # max 200 chars — shown in metadata strip
pubDate: YYYY-MM-DD
draft: false                                 # true = dev-only; false = published
tags: ["topic1", "topic2"]                   # topical (e.g. "kafka", "distributed-systems")
tech: ["Java 21", "Spring Boot", "Kafka"]    # toolset strings for metadata strip
role: "Your role on the project"             # optional
timeline: "YYYY – YYYY"                      # optional
---
```

**Note:** Do not include a `heroImage` field unless you have an actual image file in `src/assets/`. The field is optional; omitting it is correct when no image exists.

## Required H2 Structure (D-09 Convention)

Every case study body must follow this five-section structure, in this order:

```mdx
## Problem

What situation, constraint, or failure mode existed before the work began?
Focus on the business or engineering context, not the solution.

## Role

What was your specific role and scope of ownership?
Be precise — "contributor", "lead engineer", "architect", "sole implementer".

## Approach

How did you solve the problem? Walk through the key technical and process decisions.
This section can have sub-headings if the approach had distinct phases.

## Outcome

What was the measurable result? Include numbers where possible.
Address both the immediate technical outcome and any downstream business effect.

## Tech

Bullet list of technologies used and their specific purpose in this project.
```

This structure is enforced by convention, not by the schema. The section index component (`SectionIndex.astro`) renders an auto-derived table of contents when a case study has 4 or more H2 headings — the five-section structure triggers this automatically.

## Tag vs Tech Distinction

- **`tags`** — Topical keywords a reader might search or filter by. Examples: `"kafka"`, `"distributed-systems"`, `"java"`, `"database"`, `"full-stack"`. Tag index pages are generated at `/case-studies/tags/[tag]/`.
- **`tech`** — The specific tool or library strings shown in the metadata strip on the detail page and listing card. Examples: `"Apache Kafka"`, `"Java 21"`, `"Spring Boot 3"`, `"Cassandra"`. These are display strings, not slugs.

## Outcome Field

The `outcome` field is the one-line result blurb shown in two places: the listing card and the metadata strip at the top of the detail page. It should be:

- Quantified where possible: "40% reduction in X" is better than "significant improvement"
- Brief: fits in 200 characters, reads well on a single line
- Present-tense result, not description: "Query latency dropped from minutes to seconds" not "We improved query latency"

## Draft Workflow

Set `draft: true` while authoring. The entry will render in `pnpm dev` but be excluded from production builds, the RSS feed, and the sitemap. Set `draft: false` when ready to publish.

## File Naming

Use kebab-case slugs matching the URL you want: `investment-tracker-platform.mdx` renders at `/case-studies/investment-tracker-platform/`.

The `_placeholder.mdx` file in this directory exists solely to satisfy the Zod schema validator when no real case studies have been authored yet. Do not use it as a template for real content — use this README and the existing case studies as references instead.
