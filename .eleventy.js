const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const lastcommit = require('child_process').execSync(`git log -1 --no-color --stat && git diff --no-color HEAD^`).toString()
const shimmer = require("shimmer")

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

  eleventyConfig.addPlugin({
    configFunction: (__, options = {}) => {
      debugger
      // function postBuild() {
      //   const Eleventy = require("@11ty/eleventy/src/Eleventy");
      //   const Template = require("@11ty/eleventy/src/Template");
      //   shimmer.wrap(Eleventy.prototype, "finish", function(orig) {
      //     // const eleventy = new Eleventy();
      //     // console.log(JSON.stringify(eleventy))
      //     const template = new Template('.');
      //     console.log(JSON.stringify(template))
      //     // process.on("unhandledRejection", (reason) => {
      //     //   console.log("Reason: " + reason);
      //     // });
      //     return function() {
      //       return orig.apply(this);
      //     };
      //   });
      // }
      // setImmediate(postBuild);
    }
  })
  // eleventyConfig.addPlugin({
  //   configFunction: (__, options = {}) => {
  //     function postBuild() {
  //       const Eleventy = require("@11ty/eleventy/src/Eleventy");
  //       const Template = require("@11ty/eleventy/src/Template");
  //       shimmer.wrap(Eleventy.prototype, "finish", function(orig) {
  //         // const eleventy = new Eleventy();
  //         // console.log(JSON.stringify(eleventy))
  //         const template = new Template('.');
  //         console.log(JSON.stringify(template))
  //         // process.on("unhandledRejection", (reason) => {
  //         //   console.log("Reason: " + reason);
  //         // });
  //         return function() {
  //           return orig.apply(this);
  //         };
  //       });
  //     }
  //     setImmediate(postBuild);
  //   }
  // })

}
