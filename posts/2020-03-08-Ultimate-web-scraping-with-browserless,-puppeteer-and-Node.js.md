---
title: Ultimate web scraping with browserless, puppeteer and Node.js
date: 2020-03-08
layout: post.njk
tags:
  - post
  - featured
  - nodejs
  - puppeteer
  - browserless
  - scraping
  - programming
  - 100DaysOfCode
image: https://images.unsplash.com/photo-1472212712724-0f9997e1fe6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

> Browser automation built for enterprises, loved by developers.

[browserless.io](https://www.browserless.io/) is a neat service for hosted puppeteer scraping, but there is also [the official Docker image](https://docs.browserless.io/docs/docker.html) for running it locally.

I was amazed when I found out about it 🤯!

Find the whole source code on [Github christian-fei/browserless-example](https://github.com/christian-fei/browserless-example)!

## Running browserless in docker

A one-liner is enough to have a full puppeteer backend, with configured concurrency etc., to leverage using **puppeteer**.

You can connect to a browserless backend by passing the option `browserWSEndpoint` like this:

```javascript
async function createBrowser () {
  return puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' })
}
```

To start the backend you can use the following command, using the docker image `browserless/chrome`:

```bash
docker run \
  -e "MAX_CONCURRENT_SESSIONS=15" \
  -e "MAX_QUEUE_LENGTH=0" \
  -e "PREBOOT_CHROME=true" \
  -e "DEFAULT_BLOCK_ADS=true" \
  -e "DEFAULT_IGNORE_HTTPS_ERRORS=true" \
  -e "CONNECTION_TIMEOUT=600000" \
  -p 3000:3000 \
  --rm -it browserless/chrome
```

## Source code

Find the whole source code on [Github christian-fei/browserless-example](https://github.com/christian-fei/browserless-example)!

You'll find a web crawler with puppeteer!

```bash
git clone https://github.com/christian-fei/browserless-example.git
cd browserless-example
npm i

npm run start-browserless
node crawl-with-api.js https://christianfei.com
```

## Puppeteer using browserless docker backend

You simply connect to the **Browser WebSocket Endpoint** `ws://localhost:3000` and you're connected to the *browserless* backend!

Here is a short example of getting all links `<a>` on `christianfei.com`:

```javascript
const puppeteer = require('puppeteer')

main(process.argv[2])
  .then(err => console.log('finished, exiting') && process.exit(0))
  .catch(err => console.error(err) && process.exit(1))

async function main (url = 'https://christianfei.com') {
  const browser = await createBrowser()
  const page = await browser.newPage()
  await page.goto(url)
  console.log('title', await page.title())
  const links = await page.evaluate(selector => [...document.querySelectorAll(selector)], 'a')
  console.log('links.length', links.length)
}
async function createBrowser () {
  return puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' })
}
```

An example video:

<video controls="" autoplay="" name="media">
  <source src="/assets/videos/crawl-with-api.mp4" type="video/mp4">
</video>


---


<div class="alert">
  <a href="/posts/2020-03-09-Crawling-a-web-site-with-browserless,-puppeteer-and-Node.js/">
  Pssst: learn how to crawl any website with puppeteer and browserless
  </a>
  <br>
  <br>
  Read more about <a href="/tags/puppeteer">puppeteer</a> and <a href="/tags/browserless">browserless</a>
</div>

