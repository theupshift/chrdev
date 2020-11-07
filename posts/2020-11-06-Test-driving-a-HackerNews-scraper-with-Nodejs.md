---
title: "Test driving a HackerNews scraper with Node.js"
date: 2020-11-06
layout: post.njk
tags:
  - post
  - featured
  - tdd
  - nodejs
  - testing
  - cleancode
  - refactoring
  - javascript
image: https://cri.dev/assets/images/posts/hn-poster.png
---

This is a short summary of my experience while writing a **simple HackerNews scraper**.

As a pure *exercise or kata* if you want, I tried to apply *Clean code, Refactoring and Testing priciples* for this small **npm module**.

The task is simple: 

Get the posts on the front page of https://news.ycombinator.com and parse them.

---
Table of contents

- [npm setup](#npm-setup)
- [Install test dependencies](#install-test-dependencies)
- [The first test: Fetching the HTML](#the-first-test-fetching-the-html)
  - [Create `index.test.js`](#create-indextestjs)
  - [First assertion](#first-assertion)
- [Parsing](#parsing)
  - [HTML of HackerNews](#html-of-hackernews)
  - [Second test: Parsing HTML to HackerNews item](#second-test-parsing-html-to-hackernews-item)
  - [Parsing the HTML](#parsing-the-html)
  - [Extracing more data](#extracing-more-data)
- [Refactoring `parseNews`](#refactoring-parsenews)
- [Combining Parsing and Fetching](#combining-parsing-and-fetching)

# npm setup

Start with a `npm init -y` in a clean repository. You can create the repo beforehand and then initialise it with `npm`.

This creates a `package.json` file that resembles your npm package.

# Install test dependencies

I would start with `ava` as test-runner and assertion library.

`npm i --save-dev ava`

Add the following `test` script to the `scripts` section of your `package.json`:

```json
  "scripts": {
    "test": "ava",
    ...
```

# The first test: Fetching the HTML

As a first test, I would verify that I can successfully get the HTML of https://news.ycombinator.com.

Let's try.


## Create `index.test.js`

Create a file called `index.test.js` and start by including `ava`:

```js
const test = require('ava')
```


The first test could look something like this:

```js
test('gets html from https://news.ycombinator.com/', async t => {
  ...
})
```

## First assertion

Let's assert/verify that our code is able to get the html

```js
test('gets html from https://news.ycombinator.com/', async t => {
  const html = await getHTML()
  t.true(typeof html === 'string')
  t.true(html.startsWith('<html '))
})
```

Now we need `getHTML`. I like using `got` for making simple HTTP requests.

Install it with `npm i got`

```js
const got = require('got')
async function getHTML () {
  return got('https://news.ycombinator.com')
    .then(res => res.body)
}
```

Now we have `getHTML` that returns the markup for news.ycombinator.com

Let's parse it!


# Parsing

## HTML of HackerNews

Taking a look at the source of HackerNews, the page has the following structure:

```html
<table border="0" cellpadding="0" cellspacing="0" class="itemlist">
  <tbody>
    <tr class="athing" id="25005567">
      <td align="right" valign="top" class="title">
        <span class="rank">1.</span>
      </td>
      <td valign="top" class="votelinks">
        <center>
          <a id="up_25005567" href="vote?id=25005567&amp;how=up&amp;goto=news">
            <div class="votearrow" title="upvote"></div>
          </a>
        </center>
      </td>
      <td class="title">
        <a href="https://lwn.net/SubscriberLink/835962/ae41b27bc20699ad/" class="storylink">
          Deprecating scp
        </a>
        <span class="sitebit comhead"> (<a href="from?site=lwn.net"><span class="sitestr">lwn.net</span></a>)</span>
      </td>
    </tr>
    <tr>
      <td colspan="2"></td>
      <td class="subtext">
        <span class="score" id="score_25005567">399 points</span> by <a href="user?id=Tomte" class="hnuser">Tomte</a>
        <span class="age"><a href="item?id=25005567">8 hours ago</a></span> <span id="unv_25005567"></span> | <a
          href="hide?id=25005567&amp;goto=news">hide</a> | <a href="item?id=25005567">212&nbsp;comments</a> </td>
    </tr>
    <tr class="spacer" style="height:5px"></tr>
...
```

Apart from their "archaic" markup, it looks quite clear:

An item's title is in the `<td>` with the class `title`.

The upvotes, comments etc. are present in the adjacent `<td>`.

Then follows a `<tr class="spacer">`.

## Second test: Parsing HTML to HackerNews item

A test could look like this:

```js
test('parses items from html', t => {
  const news = parseNews(html())
  t.true(Array.isArray(news))
  t.is(news.length, 30)
  t.is(news[0].title, 'Deprecating scp')
  t.is(news[0].url, 'https://lwn.net/SubscriberLink/835962/ae41b27bc20699ad/')
  ...
})
```

`html()` is just a function that returns HTML from HackerNews (get the string with `view-source:https://news.ycombinator.com/`):

```js
function html () {
  return `<html lang="en" op="news"><head><meta name="referrer" content="origin">...`
}
```

So we need a function `parseNews`

## Parsing the HTML

A valid alternative to `cheerio` is [`node-html-parser`](https://www.npmjs.com/package/node-html-parser).

Install it with `npm install node-html-parser`

`parseNews` could look like this:

```js
const { parse } = require('node-html-parser')
function parseNews (html = '') {
  const doc = parse(html)
  const trs = doc.querySelectorAll('table.itemlist tr')
  return trs.reduce((acc, tr, index) => {
    const titles = tr.querySelectorAll('.title')
    if (titles.length === 2) {
      const title = tr.querySelectorAll('.title')[1].text.replace(/\(.*\)$/, '').trim()
      return acc.concat([{
        title,
        url: tr.querySelector('.title a').getAttribute('href')
      }])
    }
    return acc
  }, [])
}
```

Returning an array like this:

```js
[
  {
    "title": "Deprecating scp"
  },
  {
    "title": "Gron – Make JSON Greppable"
  },
  ...
```

This satisfies our second test!

```sh
  2 tests passed
```

## Extracting more data

Now we just extracted the title from each HackerNews post.

We can further extract `upvotes`, `author`, `link` and `comments`.

Adapting the second test:

```js
test('parses items from html', t => {
  const news = parseNews(html())
  console.log(JSON.stringify(news, null, 2))
  t.true(Array.isArray(news))
  t.is(news.length, 30)
  t.is(news[0].title, 'Deprecating scp')
  t.is(news[0].url, 'https://lwn.net/SubscriberLink/835962/ae41b27bc20699ad/')
  t.is(news[0].link, 'https://news.ycombinator.com/item?id=25005567')
  t.is(news[0].author, 'Tomte')
  t.is(news[0].upvotes, 435)
  t.is(news[0].comments, 231)
})
```

To make the test pass, let's add more logic to `parseNews`:

```js
function parseNews (html = '') {
  const doc = parse(html)
  const trs = doc.querySelectorAll('table.itemlist tr')
  return trs.reduce((acc, tr, index) => {
    const titles = tr.querySelectorAll('.title')
    if (titles.length === 2) {
      const title = tr.querySelectorAll('.title')[1].text.replace(/\(.*\)$/, '').trim()
      return acc.concat([{
        title,
        url: tr.querySelector('.title a').getAttribute('href')
      }])
    }
    const subtext = tr.querySelector('.subtext')
    if (subtext) {
      const el = subtext.querySelector('.score')
      const links = subtext.querySelectorAll('a')
      if (!el || links.length !== 4) return acc
      acc[acc.length - 1].upvotes = +el.text.replace(' points', '').trim()
      acc[acc.length - 1].author = links[0].text
      acc[acc.length - 1].comments = +links[links.length - 1].text.replace('comments', '').trim()
      acc[acc.length - 1].link = 'https://news.ycombinator.com/' + links[links.length - 1].getAttribute('href')
      return acc
    }
    return acc
  }, [])
}
```

Super, we now get a whole HackerNews item!

# Refactoring `parseNews`

`parseNews` is a messy garbage of HTML parsing with foreign selectors and special cases.

To make it a bit easier to read, I would focus on the `if` statements.

I'll try to make them clearer by adding two new functions to determine if the `<tr>` contains the title, or contains the upvotes, comments etc.

```js
function containsTitle (tr) {
  const titles = tr.querySelectorAll('.title')
  return titles.length === 2
}
function containsUpvotes (tr) {
  const subtext = tr.querySelector('.subtext')
  if (!subtext) return false
  const el = subtext.querySelector('.score')
  const links = subtext.querySelectorAll('a')
  if (!el || links.length !== 4) return false
  return true
}
```

These two functions integrated in the current `parseNews` function:

```js
function parseNews (html = '') {
  const doc = parse(html)
  const trs = doc.querySelectorAll('table.itemlist tr')
  return trs.reduce((acc, tr, index) => {
    if (containsTitle(tr)) {
      const title = tr.querySelectorAll('.title')[1].text.replace(/\(.*\)$/, '').trim()
      return acc.concat([{
        title,
        url: tr.querySelector('.title a').getAttribute('href')
      }])
    }
    if (containsUpvotes(tr)) {
      const subtext = tr.querySelector('.subtext')
      const el = subtext.querySelector('.score')
      const links = subtext.querySelectorAll('a')
      if (!el || links.length !== 4) return acc
      acc[acc.length - 1].upvotes = +el.text.replace(' points', '').trim()
      acc[acc.length - 1].author = links[0].text
      acc[acc.length - 1].comments = +links[links.length - 1].text.replace('comments', '').trim()
      acc[acc.length - 1].link = 'https://news.ycombinator.com/' + links[links.length - 1].getAttribute('href')
      return acc
    }
    return acc
  }, [])
}
function containsTitle (tr) {
  const titles = tr.querySelectorAll('.title')
  return titles.length === 2
}
function containsUpvotes (tr) {
  const subtext = tr.querySelector('.subtext')
  if (!subtext) return false
  const el = subtext.querySelector('.score')
  const links = subtext.querySelectorAll('a')
  if (!el || links.length !== 4) return false
  return true
}
```


# Combining Parsing and Fetching

Now let's write an integration test that verifies we are able to get the HTML and parse HackerNews items.

```js
test('fetches HTML and parses items', async t => {
  const html = await getHTML()
  const news = parseNews(html)
  t.is(news.length, 30)
})
```

This already works, awesome!

This is the heart of our package, so it deserves a place in `index.js`.

As well as the other code not used for tests, we put it in a folder `lib` with their tests.

The directory structure looks like this:

```
➜  hn git:(main) tree -I node_modules
.
├── README.md
├── index.js
├── index.test.js
├── lib
│   ├── get-html.js
│   ├── get-html.test.js
│   ├── parse-news.js
│   └── parse-news.test.js
├── package-lock.json
└── package.json

1 directory, 9 files
```

The full source code can be found at [github.com/christian-fei/hn](https://github.com/christian-fei/hn)

