/**
 * Avatar resolver — single source of truth for the avatar image.
 *
 * Drop the real photo into `src/assets/` as `avatar.jpg` (preferred),
 * `avatar.jpeg`, `avatar.png`, or `avatar.webp` and Astro will pick it
 * up automatically. While none of those exist, the SVG placeholder is
 * used as a safe fallback.
 *
 * Priority order: jpg → jpeg → png → webp → svg.
 *
 * Used by:
 *   - src/layouts/BaseLayout.astro (nav brand mark)
 *   - src/pages/about.astro (identity header)
 *
 * Replacing the photo: just save the file with the matching name; no
 * imports to update, no rebuild config to change.
 */

import type { ImageMetadata } from "astro";

// Vite import.meta.glob — brace expansion is evaluated at build time.
const candidates = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/avatar.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);

const priority = [
  "../assets/avatar.jpg",
  "../assets/avatar.jpeg",
  "../assets/avatar.png",
  "../assets/avatar.webp",
  "../assets/avatar.svg",
] as const;

function pickAvatar(): ImageMetadata {
  for (const key of priority) {
    const mod = candidates[key];
    if (mod) return mod.default;
  }
  throw new Error(
    "No avatar file found in src/assets/. Expected one of: " +
      "avatar.jpg, avatar.jpeg, avatar.png, avatar.webp, avatar.svg",
  );
}

export const avatar: ImageMetadata = pickAvatar();
