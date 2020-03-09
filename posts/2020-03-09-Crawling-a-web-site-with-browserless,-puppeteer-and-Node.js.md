---
title: Crawling a web site with browserless, puppeteer and Node.js
date: 2020-03-09
layout: post.njk
tags:
  - draft
  - post
---

Learn how to [get started with browserless in a few easy steps](/posts/2020-03-08-Ultimate-web-scraping-with-browserless,-puppeteer-and-Node.js/)!

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

FYI: behind the scenes the command `docker run -e "MAX_CONCURRENT_SESSIONS=10" -e "MAX_QUEUE_LENGTH=0" -p 3000:3000 --rm -it browserless/chrome`.

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

## Finding internal links with puppeteer
