import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";

/**
 * Draft-filter seam for all user-facing content surfaces (D-14).
 * In production: only non-draft entries are returned.
 * In dev: all entries are returned (including drafts) for authoring preview.
 *
 * IMPORTANT: Never call getCollection() directly in pages/ or rss.xml.ts.
 * Always use getPublishedCollection() so drafts are never accidentally exposed.
 */
export async function getPublishedCollection(collection: CollectionKey) {
  const entries = await getCollection(collection);
  return import.meta.env.PROD
    ? entries.filter((e) => !e.data.draft)
    : entries;
}
