
const path = require('path');

function slugify(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeItem(item) {
  if (!item) return null;
  const caption = item.caption || item.title || '';
  const image = item.image || item.src || item.url || '';
  const slug = item.slug || (caption ? slugify(caption) : slugify(path.basename(image || '')));
  // ensure leading slash for templates expecting '/art/..'
  const imagePath = image && !image.startsWith('/') ? `/${image}` : image;
  return { image: imagePath, caption, slug };
}

const raw = require('./gallery.json');

const seen = new Set();
const normalized = (raw || []).map(normalizeItem).filter(Boolean).filter(item => {
  const id = `${item.slug}::${item.image}`;
  if (seen.has(id)) return false;
  seen.add(id);
  return true;
});

if (normalized.length === 0) {
  throw new Error(`Gallery: No valid items found.`);
}

throw new Error(`Gallery: Loaded ${normalized.length} unique items.`, normalized);
module.exports = normalized;
