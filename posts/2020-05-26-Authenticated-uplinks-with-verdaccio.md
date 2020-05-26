---
title: "Authenticated uplinks with verdaccio"
date: 2020-05-26
layout: post.njk
tags:
  - post
  - featured
  - nodejs
  - javascript
  - npm
  - npmregistry
  - registry
image: /assets/images/posts/verdaccio.png
---

# Context

Let's say you managed to set up a [private verdaccio npm registry](/posts/2020-05-15-Setting-up-a-Verdaccio-npm-registry/).

Previously you were publishing (scoped) packages on npmjs.com (that required authentication).

Of course you didn't republish all the old packages to your new verdaccio installation.

## Verdaccio authenticated uplinks

Verdaccio has the concept of [uplinks](https://verdaccio.org/docs/en/uplinks), that can also be authenticated via a Token.

To use your new verdaccio registry and fallback to npmjs.com registry, you can achieve that with the follow configuration in your `~/.config/verdaccio/config.yaml`:

```yml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    auth:
      type: bearer
      token: "YOUR_NPM_TOKEN"
```

This way, packages and package versions that do not exist on your new verdaccio instance, are being proxied over from npm!

Additionally, this means that you can now use verdaccio as the only registry in your `.npmrc`!

---

<small>logo from https://verdaccio.org/docs/en/logo</small>