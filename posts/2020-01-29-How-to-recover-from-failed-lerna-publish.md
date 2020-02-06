---
title: Recover from failed `lerna` publish
date: 2020-01-29
layout: post.njk
tags:
  - post
  - featured
  - javascript
image: https://images.unsplash.com/photo-1508935620299-047e0e35fbe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Lately, I was having issues with `lerna` while trying to publish packages from a mono-repo.

The problem was that `lerna`, sometimes, **failed while publishing** the changed packages (with the command `lerna publish --conventional-commits`)!

I have found two examples (kindly provided by the internal [Jenkins](https://jenkins.io) at work) to give you a little bit of context:

### exhibit a

A `500` error during the publish for reasons related to NPM's package registry [registry.npmjs.org](http://registry.npmjs.org/):

```
12:35:08 lerna info git Pushing tags...

...

12:35:31 npm ERR! code E500
12:35:31 npm ERR! 500 Internal Server Error - PUT https://registry.npmjs.org/[REDACTED]
```

### exhibit b

`lerna` trying to **push over a previously published version** on npm:

```
17:22:23 lerna info git Pushing tags...

17:23:07 npm ERR! code E403
17:23:07 npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/[REDACTED] - You cannot publish over the previously published versions: 12.115.4.
17:23:07 npm ERR! 403 In most cases, you or one of your dependencies are requesting
17:23:07 npm ERR! 403 a package version that is forbidden by your security policy.
```

This is most likely due to a previous partial publish on npm.

---

`lerna publish --conventional-commits` is doing the following:

- updating the changelog, following the guidelines on [conventionalcommits.org](https://www.conventionalcommits.org/en/)
- incrementing the package version of each module linked with each other
- **pushing the git tags**
- trying to publish changed packages on `npm`

The problem *I think* is related to the fact that the `git` history is pushed **before** publishing the packages on npm (that can fail, as seen above).

---

One way to solve this issue is to run an ad-hoc command that manually publishes the missing versions on `npm` and silently failing for the one's already correctly published:

```
lerna exec -- "npm publish || exit 0"
```

Please let me know what you think on [twitter @christian_fei](https://twitter.com/christian_fei)!