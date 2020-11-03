---
title: "Show realtime visitors on your website with Plausible Analytics and CloudFlare Workers"
date: 2020-10-20
layout: post.njk
tags:
  - post
  - javascript
  - analytics
  - plausible
image: /assets/images/posts/current-visitors.png
---

[plausible.io](https://plausible.io) is my favourite Analytics service out there. It's open-source and you have the ability to self-host it.


## CORS my dear friend

I had the idea to show the realtime visitors on this site, but encountered my favourite HTTP obstacle: CORS

With a [small HTTP proxy](https://github.com/christian-fei/plausible-current-visitors-proxy) you can circumvent this limitation!

[plausible-current-visitors-proxy](https://github.com/christian-fei/plausible-current-visitors-proxy) is a small module that spins up an HTTP server that simply proxies your request to Plausible.io's API and returns the current visitors. 

Something like 10 lines of code.

## HTTP Proxy Server

Here is how you can use it.

Install it via `npm i -g plausible-current-visitors-proxy`.

Then you can run it on your own server with

```sh
DOMAIN=cri.dev plausible-current-visitors-proxy
> server listening at http://127.0.0.1:54151

curl http://127.0.0.1:54151
> 2
```

## CloudFlare Workers

The very same can be achieved with a simple CloudFlare worker!

Here the source code for the worker:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const domain = 'cri.dev'
  const url = `https://plausible.io/api/stats/${domain}/current-visitors`
  const res = await fetch(url)
  const currentVisitors = await res.text()
  return new Response(currentVisitors, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'text/plain'
    }
  })
}
```

You'll get your CloudFlare Worker URL, which will be needed.

Once configured, you can get the current visitors with a fetch request:

```javascript
const response = await window.fetch('https://current-visitors.cri.dev/')
const currentVisitors = +await res.text()
```

## JavaScript widget

The idea for the widget is simple:

You have a container in the DOM, in which you render the current visitors.

Periodically updating the current visitors.

Something like this

```javascript
getCurrentVisitors().then(showCurrentVisitors)
setInterval(() => getCurrentVisitors().then(showCurrentVisitors), 10000)

function showCurrentVisitors (currentVisitors = 0) {
  const container = document.getElementById('current-visitors-container')
  if (!container) return console.info('no container to show current visitors found')
  container.innerHTML = `
  <a aria-hidden tabindex="-1" href="https://plausible.io/cri.dev" rel="nofollow noopener external" target="_blank">
    ${currentVisitors}&nbsp;<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>
  </a>
  `.trim()
}

function getCurrentVisitors () {
  return window.fetch('https://current-visitors.cri.dev/')
    .then((res) => res.text())
}
```

The style it accordingly to your preferences.

This is the CSS used to show it on this site:

```css
#current-visitors-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.75em 1em;
  opacity: 0.3;
  font-size: 0.9em;
}

#current-visitors-container:hover {
  opacity: 1;
}
```
