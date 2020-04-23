---
title: How to solve Puppeteer Chrome Error ERR_INVALID_ARGUMENT
date: 2020-03-30
layout: post.njk
tags:
  - post
  - tutorial
  - puppeteer
  - javascript
  - 100DaysofCode
  - scraping
---

I was encountering this error when trying to set up a puppeteer instance with a proxy.

![err-invalid-argument.png](/assets/images/posts/proxy-puppeteer/err-invalid-argument.png)

I [tried](https://github.com/puppeteer/puppeteer/issues/676#issuecomment-351730660) [different](https://github.com/puppeteer/puppeteer/issues/4575) [approaches](https://github.com/puppeteer/puppeteer/issues/2234), but were either outdated or led me to a wrong path to try to solve my problem.

The main issue was that I tried to authenticate to the proxy with `setExtraHTTPHeaders`, like this:

```js
await page.setExtraHTTPHeaders({
    'Proxy-Authorization': 'Basic ...'
});
```

Then I stumbled upon the following piece of [chromium source code](https://github.com/chromium/chromium/blob/b2254b38369f4f8ce8685b7a82dee1251f6cea22/services/network/url_loader.cc#L679-L683):

```js
  // Removing headers can't make the set of pre-existing headers unsafe, but
  // adding headers can.
  if (!AreRequestHeadersSafe(modified_headers)) {
    NotifyCompleted(net::ERR_INVALID_ARGUMENT);
    // |this| may have been deleted.
    return;
  }
```

This indicates that some **headers** were modified in a "unsafe" way, which let to the `net::ERR_INVALID_ARGUMENT` error on chrome and in the terminal.

## documentation, documentation, documentation

on [pptr.de/](https://pptr.dev/) unfortunately **nada**

![doc-no-results.png](/assets/images/posts/proxy-puppeteer/doc-no-results.png)

Decided looking through the [official puppeteer API.md](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions) and found the documentation for `puppeteer.launch([options])`.

Alright.

---

Which led me to the [documentation of the supported Chromium flags](https://peter.sh/experiments/chromium-command-line-switches/).

Searching for `proxy` revealed this:

![chromium-flags-proxy.png](/assets/images/posts/proxy-puppeteer/chromium-flags-proxy.png)

## Chromium flags and puppeteer

So we can use `--proxy-server` to specify a proxy to which the browser instance connects to.

In puppeteer this would look something like this:

```js
...
const args = [
  '--no-sandbox',
  `--proxy-server=${PROXY_IP}`,
  ...
]

const puppeteerOptions = {
  args,
  ignoreHTTPSErrors: true,
  ...
}

const browser = await puppeteer.launch(puppeteerOptions)
const page = await browser.newPage()
```

That should be it if you just want to connect to a Proxy!

## What about a Proxy with auth?

No problem.

You still specify **the proxy IP address** as above

```js
...
const args = [
  '--no-sandbox',
  `--proxy-server=${AUTHENTICATED_PROXY_IP}`,
  ...
]
```

And now you simply **authenticate** to the page instance using `page.authenticate(options)`.

![page.authenticate.png](/assets/images/posts/proxy-puppeteer/page.authenticate.png)

*Note: used for [HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)*

The headers `WWW-Authenticate` && `Authorization` used in HTTP Basic are essentially the same applied for proxies, just their named differently, namely `Proxy-Authentication` && `Proxy-Authorization`.

To use `page.authenticate` and supply proxy authorization credentials you would do something along these lines:

```js
await page.authenticate({ username, password })
```

### a full example

Here you go:

- a browser instance connected to a proxy
- a browser page (that authenticated to the proxy with username and password if needed)
  - using [`get-free-https-proxy`](https://www.npmjs.com/package/get-free-https-proxy)
- show the current IP to verify the proxy is effectively used
  - using [ipinfo.io](https://ipinfo.io)

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

  // if you're using an authenticated proxy
  // await page.authenticate({ username, password })

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