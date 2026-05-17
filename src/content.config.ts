import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1).max(80),
      description: z.string().min(1).max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1).max(80),
      summary: z.string().min(1).max(200),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      heroImage: image().optional(),
      featured: z.boolean().default(false),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/caseStudies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1).max(100),
      description: z.string().min(1).max(200),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      role: z.string().optional(),
      timeline: z.string().optional(),
      heroImage: image().optional(),
      subtitle: z.string().min(1).max(80),    // D-10: required, shown on listing card + detail header
      outcome: z.string().min(1).max(200),    // D-10: one-line result blurb for listing + metadata strip
      tech: z.array(z.string()).default([]),  // D-10: toolset used (distinct from tags which are topical)
    }),
});

export const collections = { blog, projects, caseStudies };
