---
title: How to exclude Google Analytics in your Cypress E2E tests
date: 2020-04-23
layout: post.njk
tags:
  - post
---

Since Cypress.io starts a browser to run the end-to-end tests, your Google Analytics tracking calls (also from other analytics services like plausible.io) are made, and you don't want to have wrong analytics.

Looking through [cypress' documentation](https://docs.cypress.io/) I finally found the `blacklistHosts` option that can be specified in your `cypress.json` configuration file.

Simply blacklist `*.google-analytics.com` by adding an entry to `cypress.json` like this:

```json
{
  "blacklistHosts": "*.google-analytics.com",
  "video": false
}
```

### But I want to specify more than one host to block

Simply specify `blacklistHosts` as an array, as the documentation says

> By passing a string or array of strings you can block requests made to one or more hosts.

For example, to block calls to `*.google-analytics.com` **and** `*.plausible.io`, simply write:

```json
{
  "blacklistHosts": ["*.google-analytics.com", "*.plausible.io"]
}
```