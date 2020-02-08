---
title: Lazy loading images in 2020
date: 2020-02-05
layout: post.njk
tags:
  - post
  - javascript
  - featured
image: https://images.unsplash.com/photo-1564248686-f288437eb060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

The alternative title could be **Lazy loading images in 900B**.

# TLDR;

here's the source code:

```js
window.lazyLoad = lazyLoad
function lazyLoad (selector = '[lazy]') {
  console.log('lazyLoad', selector)

  let $lazy = typeof selector === 'string' ? [...document.querySelectorAll(selector)] : [...selector]
  console.log('$lazy.length', $lazy.length)

  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', $lazy.length)
  })

  $lazy = $lazy.filter(el => !(isScrolledIntoView(el) && applyLazy(el)))
  console.log(' - $lazy.length', $lazy.length)

  let lastCheck
  window.onscroll = function (e) {
    if (lastCheck && ($lazy.length === 0 || lastCheck > Date.now() - 50)) return
    lastCheck = Date.now()
    $lazy = $lazy.filter(el => !(isScrolledIntoView(el) && applyLazy(el)))
  }

  function applyLazy (el) {
    const imageUrl = el.getAttribute('lazy')
    if (el instanceof window.HTMLImageElement) {
      el.setAttribute('src', imageUrl)
    } else {
      el.style.backgroundImage = `url(${imageUrl})`
    }
    return true
  }

  function isScrolledIntoView (el) {
    var rect = el.getBoundingClientRect()
    var isVisible = (rect.top >= 0) && (rect.bottom <= (window.innerHeight + rect.height))
    return isVisible
  }
}
lazyLoad()
```

## What's that `[lazy]` thing anyway?

The [CSS Selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) (more specifically the [CSS Attribute Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)) of the HTML elements to apply lazy loading to.

You can apply it to any element and it will apply the `src` attribute to `img` elements, and the `background-image` CSS style attribute to any other element.


This enables you to do the following in HTML:

```html
<img src="placeholder.png" lazy="https://example.com/image.png">

<div lazy="https://example.com/image.png">lorem ipsum</div>
```

## `DOMContentLoaded` and `onscroll`

### DOMContentLoaded
When the DOM finishes loading, we do a first run of lazy loading applied to all elements present on the page, found by the CSS Selector `[lazy]`.

This loads images that are in view right away, as if nothing happened.

The other images, lower in the page etc, are only loaded when the user scrolls to them.

### onscroll

The procedure above is repeated every time the user scrolls the browser window, debounced by 50ms.

## applyLazy

The element passed in is modified to set the `src` attribute to `img` elements, and the `background-image` CSS Style attribute to any other element.

## isScrolledIntoView

This function determines if a passed HTML element is in sight of the user.

If so, it returns true.

## about that `.filter` part..

```js
    $lazy = $lazy.filter(el => !(isScrolledIntoView(el) && applyLazy(el)))
```

what this means is:

> apply the image lazy loading to all image in view and filter them out


# That's it

Nothing more, nothing less.

Just call `lazyLoad()` (even without arguments, if you use the convention `[lazy]`), and all your images will be lazy-loaded easily.

[grab a copy of `lazyload.js`](https://github.com/christian-fei/christian-fei.github.io/blob/master/lazyLoad.js) **now**!

I like this approach since I was triggered when I saw this [`gatsy` configuration](https://twitter.com/kentcdodds/status/1225095035936362497) for a blog search, which struck with me. In the sense that for a "simple" blog search (be it 1000 blog posts even), you can handle them easily I bet with plain HTML and JS, CSS if you want to make it look fancy.

The **next blog post** I want to tackle is exactly this: **a simple blog search**, as you can find on [/posts/](https://christianfei.com/posts/) **with just HTML and JavaScript**.

**update 2020/02/08** [Here is the blog post](/posts/2020-02-08-Simplest-Vanilla-JavaScript-static-site-blog-search-for-Jekyll,-Hugo,-11.ty-eleventy/)

## pagespeed insights says thaanks 💯

At the same time I wanted to improve my [pagespeed-insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fchristianfei.com%2F&tab=desktop) score for `christianfei.com`, and here it is:

![pagespeed-insights-christianfei.com](/assets/images/posts/pagespeed-insights.png)