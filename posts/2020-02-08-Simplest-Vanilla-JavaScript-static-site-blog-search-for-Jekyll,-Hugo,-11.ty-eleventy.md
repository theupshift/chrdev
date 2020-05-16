---
title: Simplest Vanilla JavaScript static site blog search for Jekyll, Hugo, 11.ty
date: 2020-02-08
layout: post.njk
tags:
  - post
  - featured
  - tutorial
  - javascript
image: https://images.unsplash.com/photo-1528911104572-560677f3996b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

After the [Simple-Jekyll-Search experience](https://github.com/christian-fei/Simple-Jekyll-Search/) I found a perhaps simpler way to do blog search without all the fuzz.

~ 50 lines of generic JavaScript will suffice.

What you need to set up in your HTML code is the following:

- an `<ul>` or `<ol>` preferably, but it should work with any element, with the **CSS class** `searchable` applied
- `<li>` items that represent searchable blog posts (in fact the whole `innerText` is used to look for search matches)

You can see it in action on [/posts/](/posts/).

Here is how I [set up the HTML](https://raw.githubusercontent.com/christian-fei/christian-fei.github.io/master/posts/index.md) (a simple list of posts `<li>`):

```html
<ol reversed class="searchable">
  <li class="post-item">
    <time datetime="2020-02-08" class="post-date">2020-02-08</time>
    <a href="/posts/2020-02-08-Simplest-Vanilla-JavaScript-static-site-blog-search-for-Jekyll,-Hugo,-11.ty-eleventy/" class="post-link">
      Simplest Vanilla JavaScript static site blog search for Jekyll, Hugo, 11.ty
    </a>
  </li>
    ...
</ol>
```

In my `main.js` file I use it this way, by making every `.searchable` list a searchable list:

```js
[...document.querySelectorAll('.searchable')]
  .forEach(makeSearchable)
```


Below you can find the full source code:

```js
function makeSearchable ($searchable) {
  const $search = document.createElement('input')
  $search.setAttribute('class', 'searchable-input')
  $search.setAttribute('type', 'test')
  $search.setAttribute('placeholder', 'Search posts...')
  $search.onkeyup = handleSearchKeyUp
  $searchable.parentNode.insertBefore($search, $searchable)

  function handleSearchKeyUp (e) {
    const searchTerm = e.target.value
    const searchRegExp = new RegExp(searchTerm.replace(' ', '.*'), 'i')
    const $searchableItems = $searchable.querySelectorAll('li') || []
    const postTitles = Array.prototype.map.call($searchableItems, $el => $el.innerText)
    const noMatch = postTitles.filter(t => searchRegExp.test(t)).length === 0

    let $noMatch = document.getElementById('no-match')

    if (noMatch) {
      if (!$noMatch) {
        $noMatch = document.createElement('div')
        $noMatch.setAttribute('id', 'no-match')
        $noMatch.innerText = 'No matches'
        $searchable.prepend($noMatch)
      }
    } else {
      if ($noMatch) $searchable.removeChild($noMatch)
    }

    $searchableItems.forEach(function ($postLi) {
      const show = noMatch || !searchTerm || searchRegExp.test($postLi.innerText)
      if (!show) {
        $postLi.style.display = 'none'
      } else {
        $postLi.style.display = 'list-item'
      }
    })
  }
}
```

## response to extreme gatsby configuration

this is a [`gatsy` configuration](https://twitter.com/kentcdodds/status/1225095035936362497) for a blog search I recently found on twitter, from which I was blown away because it seemed soo much for the task to be done.

I've found things like `IntersectionObserver`, `React.useMemo`, `useQueryParamState`, `React.useState`, `React.useEffect`, `navigator.clipboard.writeText`, `window.history.replaceState`.

Some are good ideas, others, in my opinion, are a bit excessive.

## What do you think?
