---
title: "Simple event tracking with Plausible Analytics"
date: 2020-07-14
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - analytics
image: /assets/images/posts/plausible-header.png
---

Do you want to know how users make use of your site? Which links they click most and what converts most?

From the [official documentation](https://docs.plausible.io/custom-event-goals) you can trigger custom events via JS, by including a small utility function `plausible`:

```html
<script>
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
</script>
```

Whenever you call `plausible('...event...')` you put a tracking event in a *queue* (`window.plausible.q`) and will be tracked.

## Track all the things

Some ideas of what you could track:

- is the CTA effective? Do people click on ["Learn Testing"](/learn-testing-nodejs-javascript/)
- do people use the navigation links in the header?
- do users click on the featured posts after reading the article?
- do people subscribe to the mailinglist after reaching the [/subscribe/](/subscribe/) page?

it all depends on the elements on your site and what matters most to you.

## Dynamic tracking via data attributes

[Data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) can be used to "mark" elements in your HTML with events you want to track.

E.g. `data-track` could be the name we choose to mark elements (specifically `a` elements):

```html
<a href="..." data-track="Clicked some-link">some link</a>
```

You simply specify the event name you want to track ("Clicked some-link") and add to the `<a>` event tracking functionality.

---

Then, in the JavaScript counterpart, you query for all elements having a `data-track` attribute:

```js
;[...document.querySelectorAll('[data-track]')].forEach(trackAction)
```

`trackAction` does the following, given a DOM element:

- it registers an event listener for the "click" event
- when that happens, the value of the `data-track` attribute is taken
- put the value of `data-track` in the localStorage

LocalStorage is needed because the event would be tracked, because the request would be aborted due to the click on a link.

Thus we swiftly put it in the localStorage, so that on the next page load (after the navigation finishes), the event can be tracked

```js
function trackAction ($el) {
  if ($el.nodeName === 'A') {
    $el.addEventListener('click', function (e) {
      window.localStorage.setItem(e.getAttribute('data-track'), 1)
    })
  }
}
```

This is where the localStorage is read and every entry in localStorage is tracked as an event.

Then the entry is removed from localStorage.

```js
Object.keys(window.localStorage).forEach(key => {
  if (/^Clicked/gi.test(key)) {
    window.plausible && window.plausible(key)
    window.localStorage.removeItem(key)
  }
})
```

# Set up "Goal conversions" on Plausible analytics

Go to your property settings, under "Goal conversions" click "Add goal" and set it up in the form `Clicked {name}`:

![/assets/posts/images/plausible-add-goal.png](/assets/images/posts/plausible-add-goal.png)

Here some examples of tracked goals.

![/assets/posts/images/plausible-goal-conversions.png](/assets/images/posts/plausible-goal-conversions.png)
