const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const changes = require('child_process').execSync(`git log -1 --no-color`).toString().trim()
  .split('\n')
  // .filter(l => !l.startsWith('Author'))
  // .filter(l => !l.trim().startsWith('commit'))
  // .map(l => l.replace(/\s{2,}/, ''))
  .map(l => l.trim())
  .join('\n')
const commit = require('child_process').execSync(`git rev-parse HEAD`).toString().trim()

function reversed (tag, collection) {
  return collection.getFilteredByTag(tag).filter(p => p.data && Array.isArray(p.data.tags) && !p.data.tags.includes('draft')).reverse()
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addCollection("posts", (collection) => reversed('post', collection))
  eleventyConfig.addCollection("last10posts", (collection) => reversed('post', collection).slice(0, 10))
  eleventyConfig.addCollection("featured", (collection) => reversed('featured', collection).slice(0, 5))
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
  eleventyConfig.addFilter("encode", (content) => encodeURIComponent(content || ''))
  eleventyConfig.addFilter("json", (obj) => JSON.stringify(obj || {}))
  eleventyConfig.addFilter("changes", (obj, cb) => changes)
  eleventyConfig.addFilter("commit", (obj, cb) => commit)
}
