---
title: "devblog: yet another static site generator, seriously"
date: 2020-04-19
updated: 2020-04-20
layout: post.njk
tags:
  - post
  - featured
  - devblog
  - blogging
  - programming
  - 100DaysOfCode
  - javascript
  - nodejs
  - tdd
  - refactoring
image: https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

[`devblog`](https://www.npmjs.com/package/devblog) is yet another lightweight static site generator.

Although there are widely used SSG like 11ty (which this blog was previously based on), Jekyll (also previously used), GatsbyJS and many others, **I wanted to get my hands dirty** and understand how to make the process of building a static blog even simpler, if possible.

Even simpler in the sense of **"it does just what I need and nothing more"**.

Install via `npm i -g devblog` or create a blog with a one-liner `npx devblog init my-new-blog`, `cd my-new-blog` and serve with `npx http-server _site 8080`. It's that easy.

Rebuild the blog by running `npx devblog` (or `npm i -g devblog` and then just run `devblog` in the main directory)

Continue reading my story of building [`devblog`](https://github.com/christian-fei/devblog).

---

<script id="asciicast-aUEeBmo0ev9TOZHsStiNyojvs" src="https://asciinema.org/a/aUEeBmo0ev9TOZHsStiNyojvs.js" async></script>

## Why would you waste your time like this?

Good question.

- to practice TDD and Refactoring skills
- to scratch a personal programming itch
- to create something I can use for my personal needs, and ideally someone else finds it useful too
- to dig deep into a topic to get the most out of it
- to personalize the experience while building my blog
- to acquire new knowledge
- to have fun  👨‍💻

![devblog-npm-package.png](/assets/images/posts/devblog-npm-package.png)

## Learned

Learned or improved knowledge about:

- TDD and Refactoring
- CI & CD with github actions build + test + npm publishing
- running scripts with `npx`
- making a simple `cli`
- YML `front-matter`
- file globbing in Node.js with `glob`
- HTML and CSS minification with `html-minifier` and `clean-css`
- nunjucks template engine
- markdown parsing with `remarkable`
- testing with `ava`
- recursively cleaning directories with `rimraf`
- read and merge a custom user config and use in application (see custom template, functions and filters to use in `nunjucks`)
- and I think lots of small things along the way

That's just to show how much you can learn if you try to build it yourself.

## Tailored to my needs

What I need for my personal blog are the following points.

- an api
- speed
- cache
- flexibility
- tests
- developer experience

### Easy programmatic API to include data

Currently [`/pocket`](/pocket), [`/contributions`](/contributions) and [`/books`](/books) needed custom data to be rendered.

For example [/pocket](/pocket) lists all my Pocket reading items and renders them on a page.

Or [/contributions](/contributions) showcases my Open Source contributions on GitHub, and is also rendered statically.

Here is a preview of my [`.devblog.js` configuration file](https://github.com/christian-fei/christian-fei.github.io/blob/master/.devblog.js):

```js
...
  collections: {
    books: require('./_data/books.json'),
    contributions: require('./_data/contributions.json'),
    pocketItems: require('./_data/pocket.json').items,
  },
...
```

The concept here is: Take a **data source**, normally a JSON file, and use it through via **nunjucks templates** and **interpolate it in JavaScript files** for rendering it on the browser.

This was also possible in 11ty btw, nothing new here.

### Speed  🏎

I can build my blog with **250+ files, of which ~120 blog posts and markdown files** in **under 10 seconds**.

With Jekyll or 11ty this was a lil bit slower, but still very usable.

The thing that made me ditch Jekyll and 11ty were its **dependencies**.

Jekyll needed Ruby, gems, bundles and god knows what else. There is also the possibility to build your site via Docker, but come on.

11ty was the closest to my favourite tools for building my site, although it slowed down over time as I added new blog posts and files. The installation on the CI took also a bit longer than expected, with **32 dependencies** (*devblog uses 8 dependencies*). But that would be also feasible if you install globally and cache correctly.. (of course 11ty offer much much more.. maybe too much for me)

That said, I still think 11ty it's still one of the most valid alternatives for building a static site  👍.

---

**It's pretty fast too!**

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why you should try devblog?<br><br>📖 <a href="https://t.co/EMGjduskCO">https://t.co/EMGjduskCO</a><br><br>📦 <a href="https://t.co/oYsLh5O7ci">https://t.co/oYsLh5O7ci</a> <a href="https://twitter.com/hashtag/blogging?src=hash&amp;ref_src=twsrc%5Etfw">#blogging</a> <a href="https://twitter.com/hashtag/bloggingtips?src=hash&amp;ref_src=twsrc%5Etfw">#bloggingtips</a> <a href="https://twitter.com/hashtag/bloggers?src=hash&amp;ref_src=twsrc%5Etfw">#bloggers</a> <a href="https://t.co/cDBRrDQ3J8">pic.twitter.com/cDBRrDQ3J8</a></p>&mdash; quarantine driven development (@christian_fei) <a href="https://twitter.com/christian_fei/status/1277899131655258119?ref_src=twsrc%5Etfw">June 30, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Caching

I'm currently working on a simple caching idea to avoid doing work that is not needed while building the site, especially during development.

E.g. If the `hash` of a file hasn't changed since the last build, there's no need to build it again.

This should speed up the whole process.

To do so, when building your static site with `devblog`, a `site.json` file is created (pretty huge JSON) with all the build information collected, including MD5 hashes.


### Programmatic access to site resources

The `site.json` file can also be used to programmatically access your blog posts with third-party tools, just by reading the JSON file.

An example?

I built a small [**Buffer automation tool**](https://github.com/christian-fei/christian-fei.github.io/tree/master/buffer-automation) for my blog.
It programmatically logs in to buffer, takes the last 10 featured blog posts (using `site.json`) and adds them to the publishing queue, with [Puppeteer](/posts/2020-03-08-Ultimate-web-scraping-with-browserless,-puppeteer-and-Node.js/). Fully automated.


### Flexibility

[`devblog`](https://github.com/christian-fei/devblog) uses [nunjucks by Mozilla](https://mozilla.github.io/nunjucks/) under the hood, as I found it the most lightweight and powerful templating language for JavaScript.

You can define **layouts, templates, interpolate variables, loop through them and so much more**:

```njk
{% raw %}
{% extends "base.html" %}

{% block header %}
<h1>{{ title }}</h1>
{% endblock %}

{% block content %}
<ul>
  {% for name, item in items %}
  <li>{{ name }}: {{ item }}</li>
  {% endfor %}
</ul>
{% endblock %
{% endraw %}
```




### Tests? Of course!

How would you build software anyways, other than with tests, refactoring and clean code in mind?

[`devblog`](https://github.com/christian-fei/devblog) is *built from the ground up with tests* and tries to cover most use cases.

Having tests doesn't mean it's *defectless and perfect*, it just means you **covered with tests the known cases**.

So, surely it might break, but *adding new features, maintaining the software and fixing defects* will be **much, much easier**. Trust me on this.

![devblog-tests.png](/assets/images/posts/devblog-tests.png)

### Developer experience

The DX is an important part when using software, at least for me.

I don't want to spend my time downloading huge tools, to later wait again and struggle with the tool.

A tool should be easy, intuitive, lightweight and flexible to use.

If it doesn't comply with my needs, I'm gonna switch (or build my own).

`devblog` tries to be as lightweight as possible, it provides a simple API to interact with it and I think it's pretty flexible and can be tailored to your needs.

## Open Source and GPL licensed

You can find the source here, if you're interested in how it works internally: [github.com/christian-fei/devblog](https://github.com/christian-fei/devblog)

Let me know if you can make use of it, found it useful or a total waste of yours and my time :)

I had fun nevertheless 👨‍💻

Check it out, fork it and [let me know @christian_fei](https://twitter.com/christian_fei) what you think of [devblog](https://github.com/christian-fei/devblog)!