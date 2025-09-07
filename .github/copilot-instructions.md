<!-- Copilot workspace instructions: Migration to Eleventy (11ty)

This file documents the high-level checklist and plan for converting the site from React (Vite) to Eleventy (11ty). Keep `galleryData` as the canonical dataset and follow the steps below when performing the migration.
-->

- # 11ty Migration Checklist

- [X] Create a `react-old/` folder and move the current React/Vite site into it for reference (preserve history and build scripts).
- [ ] Confirm templating engine: Nunjucks (default) or alternative (Liquid/Handlebars).
- [ ] Add Eleventy dev dependency: `@11ty/eleventy` and image helper: `@11ty/eleventy-img`.
- [ ] Keep `galleryData.js` as the single source of truth; re-export or import from `_data/gallery.js`.
- [ ] Create `.eleventy.js` with passthrough copy for `public/` and image shortcode using `eleventy-img`.
- [ ] Scaffold templates and includes under `src/`:
  - `src/_includes/layouts/base.njk` — base HTML (head, CSS link, header/footer includes)
  - `src/_includes/header.njk` — port from `GalleryHeader.jsx`
  - `src/_includes/footer.njk` — port from `GalleryFooter.jsx`
  - `src/_includes/gallery-item.njk` — gallery card include
  - `src/index.njk` — home page that iterates `_data/gallery.js`
  - `src/gallery/` or `src/gallery.njk` — per-item detail pages with permalink `/gallery/<slug>/`
  - `src/404.njk` — optional 404 page
- [ ] Copy or adapt CSS from `src/*.css` into `src/assets/css/` and reference from `base.njk`.
- [ ] Add helper to produce deterministic slugs (use `slugify` or small util). Detect and handle duplicates.
- [ ] Add npm scripts to `package.json`:
  - `"build": "eleventy"`
  - `"dev": "eleventy --serve --watch"`
  - (optional) `"clean": "rimraf _site .cache"`
- [ ] Implement smoke tests after build:
  - Verify `_site/index.html` exists
  - Verify at least one `_site/gallery/<slug>/index.html` exists
- [ ] Plan image handling:
  - Passthrough-copy raw assets in `public/` or
  - Use `eleventy-img` to generate responsive images and WebP fallbacks during build
- [ ] Run Eleventy build and iterate until no build-time errors remain.

# Data contract (keep `galleryData` shape)

- Input: an array of objects with keys: `title`, `image` (path), `description`, optional `slug`, optional `alt` and other metadata.
- Output: generated pages: `/` (gallery grid) and `/gallery/<slug>/` (detail pages).
- Error handling: missing image -> show placeholder; missing slug -> generate from title; duplicate slug -> append index.

# Quality gates

- Eleventy build exits 0 and produces `_site/`.
- Smoke checks for presence of index and one detail page.
- No new runtime JS required for basic gallery; preserve accessibility alt text.

# Notes & next steps for implementer

- Confirm templating preference (Nunjucks recommended).
- When ready, create `_data/gallery.js` that imports the existing `src/galleryData.js` and exports it.
- Create `.eleventy.js`, templates, and update `package.json` scripts, then run `npm run dev` or `npm run build` to validate.
- Optionally add a migration branch `migrate/11ty` and open PR once verified.

<!-- End of migration checklist -->


DO NOT LINK TO ANYTHING IN `react-old/` FROM THE NEW ELEVENTY SITE. IT'S JUST FOR REFERENCE.
