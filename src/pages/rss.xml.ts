import rss from "@astrojs/rss";
import { getPublishedCollection } from "../lib/content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  // D-16: All non-draft blog posts, reverse-chronological, full description from frontmatter
  const posts = (await getPublishedCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Shivansh Choudhary — Blog",
    description: "Writing on engineering, systems, and craft.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description, // author-controlled frontmatter — no XSS risk (T-rss-xss)
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
