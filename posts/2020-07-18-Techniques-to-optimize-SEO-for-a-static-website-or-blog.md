---
title: "Techniques to improve SEO for a static website or blog"
date: 2020-07-18
layout: post.njk
tags:
  - post
  - featured
  - tutorial
  - blog
  - seo
image: https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

> To be found, you need to describe yourself well to computers

SEO is as important as a good [mailing-list](/subscribe/) to reach your (potential) audience.

Over the past 10 years, I've made some mistakes and also took home some knowledge about SEO for [blogs](https://github.com/christian-fei/christian-fei.github.io) and [websites](https://productlistings.app/) and [landing pages](/learn-testing-nodejs-javascript/).

Below I've compiled a list of techniques and code-snippets that I personally use (hint: `view-source`) to improve for organic website traffic and SEO.

To make your content more **enjoyable by users** (social media sharing, RSS, search results) and **descriptive to machines** (SEO).

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEOhttps://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80

Don't expect the latest growth hack or marketing technique.

But do let me know on Twitter [@christian_fei](https://twitterhttps://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEO"</a>


# Table of contents

[Read all about it in the ebook format](https://gumroad.com/products/yUhsLz)

- [The head tag](#the-head-tag)
  - [HTML5 (of course)](#html5-of-course)
  - [Open Graph protocol](#openhttps://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
  - [the title tag](#the-title-tag)
  - [meta tag "description"](#meta-tag-description)
  - [feed the robots](#feed-the-robots)
  - [canonical url](#canonical-url)
  - [DNS preconnect](#dns-preconnect)
  - [Google Site Verification](#google-site-verification)
  - [RSS](#rss)
  - [Responsive tags and others](#responsive-tags-and-others)
  - [Web App meta tags](#web-app-meta-tags)
  - [meta tag "author"](#meta-tag-author)
  - [meta tag "keywords"](#meta-tag-keywords)
  - [Icons](#icons)
  - [schema.org data](#schemaorg-data)
  - [Inline CSS and PageSpeed score](#inline-css-and-pagespeed-score)
  - [Social Media Fluff](#social-media-fluff)
  - [Twitter meta tags](#twitter-meta-tags)
  - [Open Graph and Facebook](#open-graph-and-facebook)
- [Schema.org meta data for articles](#schemaorg-meta-data-for-articles)
- [Google WebMasters & Google search console](#google-webmasters-google-search-console)

**Read more techniques in the book**:

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEO"</a>

## The head tag

### HTML5 (of course)

enable it by starting your document with `<!DOCTYPE html>`

### Open Graph protocol

to your `<html>` attach the attribute `prefix="og:http://ogp.me/ns#"` to announce that you're going to specify Open Graph metadata (e.g. `og:title`, `og:type` etc)

### utf-8

specifies the document's character encoding

```html
<meta charset="https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80

add a descriptive title to your web pages. for consistency, I add `- News from Chris`

```html
<title>... - News from Chris</title>
```

**Read more techniques in the book**:

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEO"</a>


### meta tag "description"

define a description for the page.

It could be an excerpt of the blog post.

Or a https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
```html
<meta name="description" content="A blog about agile, programming, clean code, testing, javascript">
```

Whatever describes concisely why this web page exists.

### feed the robots

helps your website to be crawled by robots

```html
<meta name="robots" content="index,follow,max-video-preview:-1,max-snippet:-1,max-image-preview:large, max-video-preview:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
```


### DNS preconnect

"Pre-heat" a connection to a host.

For example if you have a script or stylesheet loaded from a CDN or images from unsplash.com:

```html
<link rel="preconnect" href="https://images.unsplash.com">
```

### Google Site Verification

[Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en) and get access to Google Search data and Google WebMaster Tools.


```html
<meta name="google-site-verification" content="..." />
```


### Responsive tags and others

Tell the browser how to scale and handle your content:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
```

### meta tag "author"

describe the author of this document

```html
<meta name="author" content="Christian Fei">
```

### meta tag "keywords"

I think I read somewhere that spiders ignore this tag completely or give it very little relevance, due to its abusive past.

It doesn't hurt if you include it:

```html
<meta name="keywords" content="Christian Fei,developer,programming,javascript,full-stack" />
```

**Read more techniques in the book**:

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEO"</a>

Learn about topics like

- canonical url

https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80

- Inline CSS and PageSpeed score

- manifest.json aka Web App Manifest

- Web App meta tags


### Social Media Fluff

#### Twitter meta tags

define stuff like your handle, who wrote this piece, the preview size on twitter etc

```html
<meta name="twitter:site" content="@christian_fei">
<meta name="twitter:domain" content="cri.dev">
<meta name="twitter:creator" content="@christian_fei">
<meta name="twitter:card" content="summary">
... read more in the ebook
```

#### Open Graph and Facebook

Using the `og:` meta tags you define in the same way the content as above essentially, using different tags..

```html
<meta property="og:locale" content="en_US" />
<meta property="og:title" content="..." />
... read more in the ebook
```

**Read more techniques in the book**:

<a class="gumroad-button" href="https://gum.co/yUhsLz" target="_blank">Get "20 Techniques to improve SEO"</a>

More in the book about:

- Schema.org meta data for articles

- Google WebMasters & https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80


### [I have compiled all of them in a ebook format](https://gumroad.com/products/yUhsLz)

I hope you found it useful and managed to see some improvements with the SEO of your site.

Let's stay in touch: [@christian_fei](https://twitter.com/christian_fei)

<script src="https://gumroad.com/js/gumroad-embed.js"></script>
<div class="gumroad-product-embed" data-gumroad-product-id="yUhsLz"><a href="https://gumroad.com/l/yUhsLz">Loading...</a></div>

<script src="https://gumroad.com/js/gumroad.js"></script>
