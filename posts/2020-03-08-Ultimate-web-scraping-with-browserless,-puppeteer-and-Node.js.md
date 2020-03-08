---
title: Ultimate web scraping with browserless, puppeteer and Node.js
date: 2020-03-08
layout: post.njk
tags:
  - post
---

> Browser automation built for enterprises, loved by developers.

[browserless.io](https://www.browserless.io/) is a neat service for hosted puppeteer scraping, but there is also [the official Docker image](https://docs.browserless.io/docs/docker.html) for running it locally.

I was amazed when I found out about it 🤯!

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


<video controls="" autoplay="" name="media">
  <source src="/assets/videos/crawl-with-api.mp4" type="video/mp4">
</video>

