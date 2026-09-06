const path = require("path");
const focalPointEditor = require("./dev/focal-point-editor");

module.exports = function (eleventyConfig) {
  // Passthrough copies for static assets
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "src/films/posters": "films/posters",
    "src/films/films.css": "films/films.css",
    "src/films/films.js": "films/films.js",
    "src/contact/contact.js": "contact/contact.js",
    presentation: "presentation",
  });

  // Simple image shortcode: returns a standard <img> tag. No external packages required.
  eleventyConfig.addNunjucksShortcode("image", function (src, alt = "") {
    if (!src) return "";
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  // Development-only UI and API for choosing thumbnail focal points.
  // This middleware is only used by `eleventy --serve`; it is not emitted to _site.
  eleventyConfig.setServerOptions({
    middleware: [focalPointEditor],
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
  };
};
