---
title: How to connect puppeteer to a Proxy
date: 2020-03-30
layout: post.njk
tags:
  - post
  - tutorial
  - puppeteer
  - javascript
  - featured
image: https://images.unsplash.com/photo-1526666361175-e3595627c376?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

In a [previous post](/posts/2020-03-30-How-to-solve-Puppeteer-Chrome-Error-ERR_INVALID_ARGUMENT/) I tried to explain how to troubleshoot an issue when connecting to a Proxy with Puppeteer investigating **API documentations** , **Chromium flags** and all that funny jazz..

This is the succint version of how to use a Proxy with Puppeteer.

## using `get-free-https-proxy`

In this example I am going use [`get-free-https-proxy`](https://www.npmjs.com/package/get-free-https-proxy), a small module that returns a list of free HTTPS proxies found on [sslproxies.org](https://www.sslproxies.org).

The same applies of course if you already have a Proxy. You would simply use `--proxy-server=YOUR_IP:YOUR_PORT` (omit the port if not needed).

Full source code below:

```js
const puppeteer = require('puppeteer')
const getFreeProxies = require('get-free-https-proxy')

;(async () => {
  const [proxy1] = await getFreeProxies()
  console.log('using proxy', proxy1)
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      `--proxy-server=${proxy1.host}:${proxy1.port}`
    ],
    headless: false,
    ignoreHTTPSErrors: true
  })
  const page = await browser.newPage()

  await page.goto('https://ipinfo.io/json')
  const content = await page.content()
  const serialized = content.substring(content.indexOf('{'), content.indexOf('}') + 1)

  console.log(JSON.parse(serialized))

  await page.waitFor(5000)
  await page.close()
  await browser.close()

  process.exit(0)
})()
```

## using `mega-scraper`

[mega-scraper](https://github.com/christian-fei/mega-scraper) is a OSS tool built to save some time while scraping any webpage. can be used as a **cli and a node.js module**, **based on puppeteer of course**.

install via `npm i mega-scraper`.

Use in the following way to simply create a browser instance with configured proxy.

By default, a free random proxy is used, scraped from `sslproxies.org` (using [`get-free-https-proxy`](https://www.npmjs.com/package/get-free-https-proxy)).

You can supply your own Proxy address by passing it as an option in the format **host:port**:

```js
const {browser: {createBrowser}} = require('mega-scraper')

;(async () => {
  const browser = await createBrowser({
    proxy: true, // or `YOUR_PROXY_IP:YOUR_PROXY_PASSWORD`,
    // more options!!
    // incognito: true,
    // headless: true,
    // cookie: '',
    // stylesheets: false,
    // images: false,
    // slowMo: true,
    // userAgent: ''
    ...
  })
  const page = await browser.newPage()

  await page.goto('https://ipinfo.io/json')
  const content = await page.content()
  const serialized = content.substring(content.indexOf('{'), content.indexOf('}') + 1)

  console.log(JSON.parse(serialized))

  await page.waitFor(5000)
  await page.close()
  await browser.close()

  process.exit(0)
```


## Authenticating to a Proxy with Puppeteer

To use a proxy that requires authentication, you would need to use [`await page.authenticate()`](https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pageauthenticatecredentials) found on the official **pptr.dev** documentation.

```js
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      `--proxy-server=YOUR_PROXY_IP:YOUR_PROXY_PORT`
    ],
    headless: false,
    ignoreHTTPSErrors: true
  })
  const page = await browser.newPage()


  await page.authenticate({
    username: 'YOUR_PROXY_USERNAME',
    password: 'YOUR_PROXY_PASSWORD'
  })

  await page.goto('https://ipinfo.io/json')
  const content = await page.content()
  const serialized = content.substring(content.indexOf('{'), content.indexOf('}') + 1)

  console.log(JSON.parse(serialized))

  await page.waitFor(5000)
  await page.close()
  await browser.close()

  process.exit(0)
})()
```
