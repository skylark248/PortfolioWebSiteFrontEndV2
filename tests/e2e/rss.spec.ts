import { test } from "@playwright/test";

/**
 * E2E tests for /rss.xml feed (BLOG-04).
 *
 * When promoted (Wave 2+), must:
 *  - GET /rss.xml and assert response Content-Type includes application/rss+xml or application/xml
 *  - Assert response body is valid XML (no parse error)
 *  - Assert <channel> contains <title>, <description>, <link>
 *  - Assert each <item> has <title>, <description>, <pubDate>, <link>
 *  - Assert draft posts are absent from feed items (BLOG-05)
 *  - Assert items are sorted reverse-chronologically by pubDate (D-16)
 */
test.describe("/rss.xml (BLOG-04, BLOG-05)", () => {
  test.todo("responds with XML content type");
  test.todo("is parseable as valid XML");
  test.todo("contains required channel elements: title, description, link");
  test.todo("each item has title, description, pubDate, link");
  test.todo("draft posts are absent from feed (BLOG-05)");
  test.todo("items are in reverse-chronological order (D-16)");
});
