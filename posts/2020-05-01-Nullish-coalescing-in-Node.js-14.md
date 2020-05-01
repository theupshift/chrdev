---
title: Nullish coalescing in Node.js 14
date: 2020-05-01
layout: post.njk
tags:
  - post
  - javascript
  - nodejs
  - featured
image: /assets/images/posts/node.js.png
---

The Nullish coalescing operator in useful to handle default values, without short-circuiting on values that result as `falsy`.

Falsy values are `undefined`, `null`, `false`, `0`, `NaN`, and `''` in JavaScript, and sometimes you want to retain those values, explicitly excluding `null` and `undefined`.

The best example is if you have a property that could assume the values `true`, `false` and `undefined` (or `null`).

Additionally, the property should become `true` (default value) if  it's not set.

You *could* be inclined to write something like this:

```js
const trialActive = user.trialActive || true
```

But what happens if the `user` has the property set to `false`? The operator `||` will use the left-hand side of the expression, and set the variable `trialActive` to `true`!

That's not what we want. Only if the `trialActive` property is unset (e.g. `null` or `undefined`), the value should be assigned to `true`, not otherwise.

Here's where the Nullish coalescing operator comes in handy.

```js
const trialActive = user.trialActive ?? true
```

In this case, **only** if the `trialActive` property is set to `undefined` or `null`, the default value `true` is used.

In the other cases, when `user.trialActive` contains the value `true` or `false`, the actual value is used, without short-circuiting the expression.

If you're interested, here is a blog post that describes [Optional chaining](/posts/2020-05-01-Optional-chaining-in-Node.js-14/) in more detail.

---

For more in-depth explanation, I strongly suggest to skim through [this blog post on v8.dev](https://v8.dev/features/nullish-coalescing) where Nullish coalescing is discussed way more in depth.

<blockquote><p>Portions of this page are modifications based on work created and <a href="/terms#site-policies">shared by the V8 project</a> and used according to terms described in <a href="https://creativecommons.org/licenses/by/3.0/">the Creative Commons 3.0 Attribution License</a>.</p></blockquote>
