const path = require("path");

module.exports = function (eleventyConfig) {
  // Passthrough copies for static assets
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
  });

  // Simple image shortcode: returns a standard <img> tag. No external packages required.
  eleventyConfig.addNunjucksShortcode("image", function (src, alt = "") {
    if (!src) return "";
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  eleventyConfig.setBrowserSyncConfig({
    notify: false,
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

