const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const [commitLong, date, ...commitDescription] = require('child_process').execSync(`git log -1 --no-color`)
  .toString()
  .split('\n')
  .filter(Boolean)
  .map(l => l.trim())
  .filter(l => !l.startsWith('Author:'))
const commit = commitLong.replace(/^commit /, '').substring(0, 7)

function reversed (tag, collection) {
  return collection.getFilteredByTag(tag).filter(p => p.data && Array.isArray(p.data.tags) && !p.data.tags.includes('draft')).reverse()
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addCollection("posts", (collection) => reversed('post', collection))
  eleventyConfig.addCollection("last10posts", (collection) => reversed('post', collection).slice(0, 10))
  eleventyConfig.addCollection("featured", (collection) => reversed('featured', collection).slice(0, 10))
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (!outputPath.endsWith(".html")) return content
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    })
  })
  eleventyConfig.addFilter("cssmin", (code) => new CleanCSS({}).minify(code).styles)
  eleventyConfig.addFilter("words", (content) => (content || '').split(' ').length)
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || '').split(' ').length
    const averageWPM = 250
    const readingTimeInMinutes  = words / averageWPM * 2
    const minutes = parseInt(readingTimeInMinutes, 10)
    return minutes > 1 ? `${minutes} minutes` : `1 minute`
  })
  eleventyConfig.addFilter("excerpt", (content) => (content || '').substring(0, 200))
  eleventyConfig.addFilter("encode", (content) => encodeURIComponent(content || ''))
  eleventyConfig.addFilter("json", (obj) => {
    try {
      return JSON.stringify(obj || {})
    } catch (err) {
      return ''
    }
  })
  eleventyConfig.addFilter("printdate", (date) => {
    try {
      return new Date(date).toISOString().substring(0, 10)
    } catch (err) {
      return JSON.stringify(date)
    }
  })
  eleventyConfig.addFilter("commit", (obj, cb) => commit)
  eleventyConfig.addFilter("githubCommitDiffUrl", (obj, cb) => `https://github.com/christian-fei/christian-fei.github.io/commit/${commit}`)
  eleventyConfig.addFilter("year", (obj, cb) => new Date().getFullYear())
}
