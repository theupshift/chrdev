---
title: "Techniques to optimize SEO for a static website or blog"
date: 2020-07-18
layout: post.njk
tags:
  - post
  - featured
  - tutorial
  - blog
  - seo
image: https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

> To be found, you need to describe yourself well to computers

SEO is as important as a good [mailing-list](/subscribe/) to reach your (potential) audience.

Over the past 10 years, I've made some mistakes and also took home some knowledge about SEO for [blogs](https://github.com/christian-fei/christian-fei.github.io) and [websites/landing pages](https://cri.dev/learn-testing-nodejs-javascript/).

Below I've compiled a list of techniques and code-snippets that I personally use (hint: `view-source`) to optimize for organic website traffic and SEO.

To make your content more **enjoyable by users** (social media sharing, rss, search results) and **descriptive to machines** (SEO).

---

The techiques are more related to code.

Don't expect the latest growth hack or marketing technique.

But do let me know on Twitter [@christian_fei](https://twitter.com/christian_fei)

# tldr;

using [devblog](https://github.com/christian-fei/devblog) (related [article](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/)) I can achieve the following:

[full list](https://github.com/christian-fei/christian-fei.github.io/blob/master/_includes/layout.njk#L3-L117) of meta tags and other "SEO tricks"

[sitemap.xml](https://github.com/christian-fei/christian-fei.github.io/blob/master/sitemap.md) to define a structure for your website

[robots.txt](https://github.com/christian-fei/christian-fei.github.io/blob/master/robots.txt) to be crawled properly

[manifest.json](https://github.com/christian-fei/christian-fei.github.io/blob/master/manifest.json) i don't really know what it does

[social media](https://github.com/christian-fei/christian-fei.github.io/blob/master/_includes/layout.njk#L37-L58) twitter + facebook and generic meta tags

[schema.org definition](https://github.com/christian-fei/christian-fei.github.io/blob/master/_includes/layout.njk#L66-L87) markup for your website

[inline css when possible](https://github.com/christian-fei/christian-fei.github.io/blob/master/_includes/layout.njk#L90-L106) and other techniques help to improve [LightHouse score](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcri.dev%2F&tab=desktop)

[schema.org article markup](https://github.com/christian-fei/christian-fei.github.io/blob/master/_includes/post.njk#L5) to describe parts of the article (title, author, date etc.)

# More in depth

## The head tag

### HTML5 (of course)

enable it by starting your document with `<!DOCTYPE html>`

### Open Graph protocol

to your `<html>` attach the attribute `prefix="og:http://ogp.me/ns#"` to announce that you're going to specify Open Graph metadata (e.g. `og:title`, `og:type` etc)

### utf-8

specifies the document's character encoding

```html
<meta charset="utf-8">
```

### the title tag

add a descriptive title to your web pages. for consistency, I add `- News from Chris`

```html
<title>{{ title }} - News from Chris</title>
```