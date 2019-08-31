const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cp = require('child_process')
const lastcommit = cp.execSync(`git log -1 --no-color --stat && git diff --no-color HEAD^`).toString()
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByTag('post').reverse();
  });
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  eleventyConfig.addFilter("excerpt", function(content) {
    return (content || '').substring(0, 200)
  });
  eleventyConfig.addFilter("json", function(obj) {
    return JSON.stringify(obj || {})
  });
  eleventyConfig.addFilter("commit", function(obj, cb) {
    return lastcommit
  });
};
