import { describe, it, expect } from "vitest";

// Pure logic test mirrors the curation pattern that src/pages/index.astro will use.
// When Plan 03-06 ships the page, the same function shape (filter → sort → slice → fallback)
// must be present in the page frontmatter. This unit test is the contract.
function applyFeaturedCap<T extends { featured: boolean; featuredOrder?: number; pubDate: Date }>(
  entries: T[], cap: number, fallbackCount: number
): T[] {
  const featured = entries
    .filter((e) => e.featured)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, cap);
  if (featured.length > 0) return featured;
  return entries
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
    .slice(0, fallbackCount);
}

// ─── Featured curation logic (D-05, D-09) ──────────────────────────────────
describe("featured curation logic (D-05, D-09)", () => {
  it("caps at 4 when more than 4 are featured", () => {
    const entries = Array.from({ length: 6 }, (_, i) => ({
      featured: true, featuredOrder: i + 1, pubDate: new Date(),
    }));
    expect(applyFeaturedCap(entries, 4, 2)).toHaveLength(4);
  });

  it("sorts featured entries by featuredOrder ascending", () => {
    const entries = [
      { featured: true, featuredOrder: 3, pubDate: new Date() },
      { featured: true, featuredOrder: 1, pubDate: new Date() },
      { featured: true, featuredOrder: 2, pubDate: new Date() },
    ];
    expect(applyFeaturedCap(entries, 4, 2).map((e) => e.featuredOrder)).toEqual([1, 2, 3]);
  });

  it("returns fallback N most-recent when zero are featured (D-09)", () => {
    const entries = Array.from({ length: 5 }, (_, i) => ({
      featured: false, pubDate: new Date(2026, 0, i + 1),
    }));
    const result = applyFeaturedCap(entries, 4, 2);
    expect(result).toHaveLength(2);
    // most-recent first
    expect(result[0].pubDate.valueOf()).toBeGreaterThan(result[1].pubDate.valueOf());
  });

  it("treats missing featuredOrder as last (Infinity sentinel 999)", () => {
    const entries = [
      { featured: true, featuredOrder: undefined, pubDate: new Date() },
      { featured: true, featuredOrder: 1, pubDate: new Date() },
    ];
    const result = applyFeaturedCap(entries, 4, 2);
    expect(result[0].featuredOrder).toBe(1);
  });
});
