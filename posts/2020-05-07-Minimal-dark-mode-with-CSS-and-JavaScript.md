---
title: Minimal dark mode with CSS and JavaScript
date: 2020-05-07
layout: post.njk
tags:
  - post
  - featured
  - darkmode
image: https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Dark mode is everywhere nowadays. Personally using [darkreader](https://darkreader.org/) as an extension of [Brave browser](https://brave.com/chr311), and I'm loving it.

But if you want to roll your own, for fun or for whatever reason, here is how I did it for [cri.dev](/).

---

*Mandatory disclaimer: it's not perfect, and you might need to customize it further based on your CSS rules. But what is perfect in this world?*

The technique consists of a single line of CSS and a few lines of JavaScript.

## The CSS part

```css
body.dark-mode { background: #232323; color: white; }
```

What this does is setting a darker background color to the body and a bright color, use your preferred combination and optimize for readability at your liking.

So, if you set the CSS class `dark-mode` to the body, you will see your site in "dark-mode".
Remember, some things might break, based on your CSS rules and specifity of those.

A more aggressive approach could be (but I don't recommend it) could be:

```css
*, * > * { background: #232323; color: white; }
```
Don't do this, it's just food for thought plus the selector looks funny.

## The JavaScript part

The idea is:

If the URL contains `dark` in its [query string](https://developer.mozilla.org/en-US/docs/Web/API/Location/search), enable the dark-mode styles (remember: through the CSS class `dark-mode` on to the `body`).

E.g. if the URL contains `?dark` or `?darkmode` (even `?dark-mode`), apply the dark CSS styles:

Using [`window.location.search`](https://developer.mozilla.org/en-US/docs/Web/API/Location/search) and [`String.prototype.includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) it looks like this:

```js
if ((window.location.search || '').includes('dark')) {
  document.body.classList.add('dark-mode')
}
```
Since in JS (or live in general) you cannot give anything for granted, I fallback to an empty string when checking for the inclusion of the word `dark` in `window.location.search`.

If that check is true, then we can start to apply the `dark-mode` class on the body.

Easy peasy.

## Preserving state

What if the user clicks on an internal link? The browser will follow the link, but 'forget' about the query string.

Thus we need to preserve it.

The idea is also quite simple here:

For all internal links that contains the current host in its `href` attribute, or are relative links (start with `/`), append the query string to it.

This is my approach, and the code above looks like this after applying this logic:

```js
if ((window.location.search || '').includes('dark')) {
  document.body.classList.add('dark-mode')
  addDarkmodeQueryToInternalLinks()
}
function addDarkmodeQueryToInternalLinks () {
  const internalLinks = [...document.querySelectorAll(`a[href~='${window.location.hostname}'], a[href^='/']`)]
  internalLinks.forEach(el => el.setAttribute('href', el.getAttribute('href') + '?dark'))
}
```

#### Breaking it down

`internalLinks` are all `<a>`'s on the document that contain the current hostname (namely `window.location.hostname`) and start with a `/` (through the CSS selector).

If you're interested in learning more about CSS Attribute selectors, MDN got you covered:

Go to [Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) and look for `[attr^=value]`, which as cited on MDN means:

> Represents elements with an attribute name of attr whose value is prefixed (preceded) by value.

Finally, in the last line of `addDarkmodeQueryToInternalLinks`, we loop through the links and append to the `href` attribute a `?dark` query string.

That's it.
