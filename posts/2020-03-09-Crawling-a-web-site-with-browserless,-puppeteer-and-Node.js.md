---
title: Crawling a web site with browserless, puppeteer and Node.js
date: 2020-03-09
layout: post.njk
tags:
  - post
  - featured
  - nodejs
  - puppeteer
  - browserless
  - scraping
  - 100DaysOfCode
  - programming
image: https://images.unsplash.com/photo-1532802245604-c567f1acd48e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---


<div class="">
Learn how to <a href="/posts/2020-03-08-Ultimate-web-scraping-with-browserless,-puppeteer-and-Node.js/">get started with browserless in a few easy steps</a>!
</div>


## Source code to follow along

You can get a copy of the source code from [github.com/christian-fei/browserless-example](https://github.com/christian-fei/browserless-example), and follow these steps:

```bash
git clone https://github.com/christian-fei/browserless-example.git
cd browserless-example
npm i

npm run start-browserless
node crawl-with-api.js https://christianfei.com
```

## Starting the browserless backend

From inside the repository **christian-fei/browserless-example**, run the following to start the browserless backend (requires to be *Docker* running):

```bash
npm run start-browserless
```

FYI: behind the scenes this command is used: `docker run -e "MAX_CONCURRENT_SESSIONS=10" -e "MAX_QUEUE_LENGTH=0" -p 3000:3000 --rm -it browserless/chrome`.

## Connecting puppeteer to browserless

Instead of spinning up a chrome instance on your own machine, you can virtualize it and run it (even on another host!) in Docker, through browserless.

This can be achieved by supplying an extra parameter to `puppeteer.connect` (notice that we use `.connect` instead of `.launch`), namely `browserWSEndpoint`:

```javascript
const puppeteer = require('puppeteer')

async function main () {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' })
}
```

This way a puppeteer instance from the browserless pool is used. BTW on `http://localhost:3000` you can see the currently opened browser sessions.

![browserless sessions](/assets/images/posts/browserless/browserless-sessions.png)

## About the browserless HTTP API 👌

When you have a **browserless backend** running (on port **3000**), you can make HTTP request to that API, that is further documented on the [official docs](https://docs.browserless.io/docs/scrape.html):

You can `POST` to the endpoint `/scrape` and instruct **puppeteer** to extract all elements matching a given selector, and much more:

```bash
curl -X POST \
  https://chrome.browserless.io/scrape \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://example.com/",
  "elements": [{
      "selector": "a"
  }]
}'
```

Additionally you can also take screenshots, get the whole HTML of a page, and more with the `debug` property:

```bash
curl -X POST \
  http://localhost:3000/scrape \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://example.com/",
  "elements": [{
      "selector": "a"
  }],
  "debug": {
    "screenshot": true,
    "console": true,
    "network": true,
    "cookies": true,
    "html": true
  }
}'
```

# The Node.js crawler

I am going to use `p-queue` to set up a simple queue (in-memory) and `got` for making HTTP requests.

The queue represents all scraping jobs for a given URL.

The idea is to start from the homepage and from there look for all relative links (`<a>` with a `href` attribute starting with `/`).

**create the queue**

```javascript
  const queue = new PQueue({ concurrency: 5, timeout: 30000 })
```

To start of the crawling process, add a first url to crawl, from there on look for further links to crawls, and so forth:

```javascript
  queue.add(() => crawl(url, { baseurl, seen = new Set(), queue }))
```

**the `crawl` function**

The `crawl` function is a recursive one, whose job is to crawl more links from a single URL and add them as crawling jobs to the queue.

It makes a HTTP POST request to `http://localhost:3000/scrape` scraping for relative links on the page.

```javascript
async function crawl (url, { baseurl, seen = new Set(), queue }) {
  console.log('🕸   crawling', url)
  const { body } = await got.post(`http://localhost:3000/scrape`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      elements: [{
        selector: `a[href^="/"]]`
      }],
      debug: { html: true }
    }),
    timeout: 10000
  })
  const json = JSON.parse(body)
```

Now you have a `json` object containing the results from your scraping job, e.g.:

```json
{
  "data": [{
    "selector": "a[href^=\"/\"]",
    "results": [{
      "html":
...
```

**Extract links**

From `data[0].results` you can map all matching elements found on the page for the selector `a[href^="/"]` and extract all links:

```javascript
  const links = json.data[0].results
    .filter(r => r.attributes.find(a => a.name === 'href'))
    .map(r => r.attributes.find(a => a.name === 'href').value)
```

**Add new links to queue**

Filter out unwanted links, make relative links absolute by prepending the *baseurl*, exclude links with anchors tags, and finally verify through the `seen` `Set` that the links hasn't been crawled before:

```javascript
  links
    .filter(link => !link.startsWith('//'))
    .map(link => link.startsWith(baseurl) ? link : `${baseurl.replace(/\/$/, '')}${link}`)
    .filter(link => !/#.*$/.test(link))
    .filter(l => !seen.has(l))
    .forEach(l => {
      seen.add(l)
      queue.add(() => retry(() => crawl(l, { baseurl, seen, completed, queue })))
    })
```

At the end, you add the resulting link to the `seen` `Set` to avoid crawling it more than once, and add new links to the crawling queue.

---

# Full source code on GitHub

Fork / clone it from [christian-fei/browserless-example](https://github.com/christian-fei/browserless-example/),
with Docker installed and running:

```bash
git clone https://github.com/christian-fei/browserless-example.git
cd browserless-example
npm i

npm run start-browserless
node crawl-with-api.js https://christianfei.com
```

---

Read more about [puppeteer](/tags/puppeteer) and [browserless](/tags/browserless)
