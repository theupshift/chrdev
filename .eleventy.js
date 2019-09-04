const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const lastcommit = require('child_process').execSync(`git log -1 --no-color --stat && git diff --no-color HEAD^`).toString()

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addCollection("posts", (collection) => collection.getFilteredByTag('post').reverse())
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (!outputPath.endsWith(".html")) return content
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    })
  })
  eleventyConfig.addFilter("cssmin", (code) => new CleanCSS({}).minify(code).styles)
  eleventyConfig.addFilter("excerpt", (content) => (content || '').substring(0, 200))
  eleventyConfig.addFilter("json", (obj) => JSON.stringify(obj || {}))
  eleventyConfig.addFilter("commit", (obj, cb) => lastcommit)
}
