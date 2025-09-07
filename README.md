# Dreamwalker Gallery — Eleventy migration

## What's included

- Eleventy scaffold using Nunjucks templates
- Re-uses gallery canonical data from `react-old/src/galleryData.js` via `_data/gallery.js`
- Basic responsive image shortcode using `@11ty/eleventy-img`

## Quick start

1. Install dev dependencies:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

Build:

```powershell
npm run build
```

## Notes / next steps

- Review `src/_data/gallery.js` to confirm paths and metadata.
- Decide whether to passthrough-copy `react-old/public/art` or use `eleventy-img` to generate responsive assets.
- Placeholder image is available at `src/assets/img/placeholder.svg`.
