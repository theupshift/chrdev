module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByTag('post').reverse();
  });
};
