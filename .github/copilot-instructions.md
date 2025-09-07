<!-- Copilot workspace instructions: Migration to Eleventy (11ty)

This file documents the high-level checklist and plan for converting the site from React (Vite) to Eleventy (11ty). Keep `galleryData` as the canonical dataset and follow the steps below when performing the migration.
-->

- # 11ty Migration Checklist

- [X] Create a `react-old/` folder and move the current React/Vite site into it for reference (preserve history and build scripts).
- [X] Confirm templating engine: Nunjucks (default) or alternative (Liquid/Handlebars).
- [X] Add Eleventy dev dependency: `@11ty/eleventy` and image helper: `@11ty/eleventy-img`.
- [X] Create `.eleventy.js` with passthrough copy for `public/` .
- [X] Scaffold templates and includes under `src/`:
  - [X] `src/_includes/layouts/base.njk` — base HTML (head, CSS link, header/footer includes)
  - [X] `src/_includes/header.njk` — port from `GalleryHeader.jsx`
  - [X] `src/_includes/footer.njk` — port from `GalleryFooter.jsx`
  - [X] `src/_includes/gallery-item.njk` — gallery card include
  - [X] `src/index.njk` — home page that iterates `_data/gallery.json`
  - [X] `src/gallery/` or `src/gallery.njk` — per-item detail pages with permalink `/gallery/<slug>/`
  - [ ] `src/404.njk` — optional 404 page
- [X] Copy or adapt CSS from `src/*.css` into `src/assets/css/` and reference from `base.njk`.
- [X] Add helper to produce deterministic slugs (use `slugify` or small util). Detect and handle duplicates.
- [X] Add npm scripts to `package.json`:
  - [X] `"build": "eleventy"`
  - [X] `"dev": "eleventy --serve --watch"`
  - [X] (optional) `"clean": "rimraf _site .cache"`
- [X] Implement smoke tests after build:
  - [X] Verify `_site/index.html` exists
  - [X] Verify at least one `_site/gallery/<slug>/index.html` exists
- [X] Plan image handling:
  - [X] Passthrough-copy raw assets in `public/` 
- [X] Run Eleventy build and iterate until no build-time errors remain.

# Quality gates

- Eleventy build exits 0 and produces `_site/`.
- Smoke checks for presence of index and one detail page.
- No new runtime JS required for basic gallery; preserve accessibility alt text.

# Notes & next steps for implementer

- Confirm templating preference (Nunjucks recommended).
- Create `.eleventy.js`, templates, and update `package.json` scripts, then run `npm run dev` or `npm run build` to validate.
- Optionally add a migration branch `migrate/11ty` and open PR once verified.

<!-- End of migration checklist -->
