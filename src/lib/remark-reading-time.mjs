import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * Custom remark plugin that injects reading time into MDX frontmatter (D-11).
 * Follows the official Astro recipe: docs.astro.build/en/recipes/reading-time/
 *
 * Access in page components via:
 *   const { remarkPluginFrontmatter } = await render(entry);
 *   const minutesRead = remarkPluginFrontmatter.minutesRead; // e.g. "3 min read"
 *
 * Only use minutesRead in BlogPostLayout — not in case study or project layouts (D-11).
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
