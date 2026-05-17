import { test } from "@playwright/test";

/**
 * E2E tests for /blog listing page (BLOG-01, BLOG-05).
 *
 * When promoted (Wave 2+), must:
 *  - Visit /blog and assert H1 is "Blog"
 *  - Assert posts appear in reverse-chronological order by pubDate
 *  - Assert each row shows title (link), date (MMM D, YYYY format), "N min read", tag chips, description
 *  - Assert draft posts are NOT listed in production build
 *  - Assert RSS subscribe link is present in page chrome
 *  - Assert empty state "No posts yet — check back soon." when no published posts
 */
test.describe("/blog listing (BLOG-01, BLOG-05)", () => {
  test.todo("renders H1 'Blog'");
  test.todo("lists published posts in reverse-chronological order");
  test.todo("each row shows title link, date, reading time, tag chips, excerpt");
  test.todo("draft posts are excluded from listing (BLOG-05)");
  test.todo("RSS subscribe link is present");
  test.todo("shows empty state when no published posts");
});
