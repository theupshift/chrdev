---
title: better web scraping with node.js
date: 2019-12-11
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - general
---

### Web scraping?

> Web scraping [...] is used for extracting data from websites

from [Wikipedia "Web scraping"](https://en.wikipedia.org/wiki/Web_scraping)

## introducing mega-scraper

it's been a month since I started working on [mega-scraper](https://github.com/christian-fei/mega-scraper).

> mega-scraper is meant to make scraping a website better

it is based on the popular **Puppeteer** API to interact with a Chromium instance, a web browser.

the scraping queue is based on **Redis** and can be monitored using [bull-dashboard](https://github.com/christian-fei/bull-dashboard).

I built it because I felt the need for a better way to do scraping.

## reliable scraping

how to make scraping more reliable and less detectable by anti-scraping shields?

I think the way to go is to simulate a real user using a real browser.

> it also comes in handy when debugging and inspect updated CSS selectors or understand how to avoid unexpected modals or solve captcha pages.

you could even simulate a legit user session by having a pool of legit cookies.

the possibilities are wider if you try to surf a website as similar as possible to a real user browsing a product page, with eased step timeouts, random scrolling of a page, etc.

why not, even login to a given page with a real customer account to almost undetectably scrape its content.

## fast scraping

**blocking trackers** by default.

**avoiding loading images, stylesheets, if possible javascript** speed up the scraping A LOT!

being able to **proxy each request** can also help in case of speed, since you're using multiple services to handle your requests.

## it's all about experimenting

mega-scraper itself needs lots of improvements and new creative ways to avoid (even solve) captchas, improve networking, generic pagination, automation data extraction and much more.

## open-source and npm package

mega-scraper is available on [github.com/christian-fei/mega-scraper](https://github.com/christian-fei/mega-scraper/) and can  be monitored using [github.com/christian-fei/bull-dashboard/](https://github.com/christian-fei/bull-dashboard/).

[![assets/images/posts/mega-scraper/mega-scraper-github.png](/assets/images/posts/mega-scraper/mega-scraper-github.png)](https://github.com/christian-fei/mega-scraper/)

both are available as npm packages 📦

[mega-scraper](https://www.npmjs.com/package/mega-scraper/)

[![NPM](https://nodei.co/npm/mega-scraper.png)](https://npmjs.org/package/mega-scraper)

[bull-dashboard](https://www.npmjs.com/package/bull-dashboard/)

[![NPM](https://nodei.co/npm/bull-dashboard.png)](https://npmjs.org/package/bull-dashboard)

let me know if you find ways to improve web scraping by opening a pull-request on GitHub at [github.com/christian-fei/mega-scraper](https://github.com/christian-fei/mega-scraper/) and also, let me know on [Twitter @christian_fei](https://twitter.com/christian_fei) what you think!
