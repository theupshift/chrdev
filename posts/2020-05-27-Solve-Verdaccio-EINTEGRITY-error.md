---
title: "Solve Verdaccio EINTEGRITY error"
date: 2020-05-27
layout: post.njk
tags:
  - post
  - nodejs
  - javascript
  - npm
  - npmregistry
  - registry
image: /assets/images/posts/verdaccio.png
---

Are you getting errors regarding `EINTEGRITY` when running an `npm install` and [using a private Verdaccio registry](/posts/2020-05-15-Setting-up-a-Verdaccio-npm-registry/)?

This is due to the fact that the SHA-SUM of the proxied packages changes.

It doesn't reflect the cached information in your `package-lock.json`.

To solve this issue, simply remove the `package-lock.json` and run `npm install` again.
