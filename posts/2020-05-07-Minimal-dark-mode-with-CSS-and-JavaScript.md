---
title: Minimal dark mode with CSS and JavaScript
date: 2020-05-07
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - css
  - darkmode
image: https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Dark mode is everywhere nowadays. Personally using [darkreader](https://darkreader.org/) as an extension of [Brave browser](https://brave.com/chr311), and I'm loving it.

But if you want to roll your own, for fun or for whatever reason, continue reading to understand how I did it.

---

*Mandatory disclaimer: it's not perfect, and you might need to customize it further based on your CSS rules. But what is perfect in this world?*

The technique consists of a single line of CSS and a few lines of JavaScript.

Try it out.

<button style="display: block;width: 100%;padding: 1em;font-size: 1.5em;outline: none;background: black;color: white;border: 2px solid white;" class="toggle-dark-mode">Toggle dark-mode</button>

## The CSS part

```css
body.dark-mode { background: #232323; color: white; }
```

What this does is setting a darker background color to the body and a bright color, use your preferred combination and optimize for readability at your liking.

So, if you set the CSS class `dark-mode` to the body, you will see your site in "dark-mode".
Remember, some things might break, based on your CSS rules and specifity of those.

A more aggressive approach (but I don't recommend it) could be:

```css
*, * > * { background: #232323; color: white; }
```
Don't do this, it's just food for thought plus the selector looks funny.

## The JavaScript part

The idea is:

If the URL contains `dark` in its [query string](https://developer.mozilla.org/en-US/docs/Web/API/Location/search), enable the dark-mode styles (remember: through the CSS class `dark-mode` on the `body`).

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

For all internal links that contain the current host in its `href` attribute, or are relative links (start with `/`), append the query string to it.

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

You can now put `?dark` at the end of this URL and darkmode will be applied.

## Enabling darkmode with a button

You cannot ask the user to modify the URL manually of course.

So we need a button that does this.

```html
<button id="toggle-dark-mode">Toggle dark-mode</button>
```

And the JS counterpart:

```js
document.querySelector('#toggle-dark-mode').addEventListener('click', function (event) {
  const darkModeEnabled = (window.location.search || '').includes('dark')
  if (darkModeEnabled) {
    window.location.href = window.location.href.substring(0, uri.indexOf('?'))
  } else {
    window.location.href = window.location.href + '?dark'
  }
})
```

That's it. Try it out.

<button style="display: block;width: 100%;padding: 1em;font-size: 1.5em;outline: none;background: black;color: white;border: 2px solid white;" class="toggle-dark-mode">Toggle dark-mode</button>
<script type="text/javascript">
[...document.querySelectorAll('.toggle-dark-mode')].forEach(el => el.addEventListener('click', function (event) {
  const darkModeEnabled = (window.location.search || '').includes('dark')
  console.log(darkModeEnabled)
  if (darkModeEnabled) {
    window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'))
  } else {
    window.location.href = window.location.href + '?dark'
  }
}))
</script>

## Notes

This is an oversimplified example. It should work well if you don't have params in the URL, else you would need to parse them correctly using [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## Native solution

You could achieve a similar result, using the **media query** `prefers-color-scheme:dark`:

```css
@media (prefers-color-scheme:dark) {
  ... // your dark styles
}
```
