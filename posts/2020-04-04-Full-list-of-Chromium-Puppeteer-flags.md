---
title: Full list of Chromium Puppeteer flags and command line switches
date: 2020-04-04
layout: post.njk
tags:
  - post
  - tutorial
  - puppeteer
  - scraping
  - featured
image: /assets/images/posts/puppeteer.png
---

After quite a bit of research, I found the full list of [Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/).

![chromium-flags.png](/assets/images/posts/chromium-flags.png)

Here you can find [more information about flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

### mega-scraper sane defaults

[mega-scraper](https://github.com/christian-fei/mega-scraper/) has a mature and battle-tested list of default flags, check it out here in the [`file get-puppeteer-options`](https://github.com/christian-fei/mega-scraper/blob/master/lib/browser/get-puppeteer-options.js):

```js
  ...
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--single-process',
    '--no-zygote',
    '--no-first-run',
    `--window-size=${options.width || 1280},${options.height || 800}`,
    '--window-position=0,0',
    '--ignore-certificate-errors',
    '--ignore-certificate-errors-skip-list',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--hide-scrollbars',
    '--disable-notifications',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-component-extensions-with-background-pages',
    '--disable-extensions',
    '--disable-features=TranslateUI,BlinkGenPropertyTrees',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    '--force-color-profile=srgb',
    '--metrics-recording-only',
    '--mute-audio'
  ]
  ...
```

Additionally, if you want to see what is enabled/disabled, you can navigate to [chrome://flags](chrome://flags) and see the full list:

![chrome-flags.png](/assets/images/posts/chrome-flags.png)
