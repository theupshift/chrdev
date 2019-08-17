module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("carbonads.css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByTag('post').reverse();
  });
};
