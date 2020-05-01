---
title: Optional chaining in Node.js 14
date: 2020-05-01
layout: post.njk
tags:
  - post
  - javascript
  - nodejs
  - featured
image: /assets/images/posts/node.js.png
---

A long awaited feature of the language and runtime has been [released](https://medium.com/@nodejs/node-js-version-14-available-now-8170d384567e) and is available in Node.js 14: Optional chaining!

# Safe property access

Sometimes accessing properties of objects can be tedious, especially if deeply nested.

Developers often need to write exotic if-statements to verify that a given property exists.

Even worse if you need to write complex, nested `ternary` conditions using the ternary operator `cond ? x : y`.

Here is an example, adapted from code in [devblog](https://github.com/christian-fei/devblog), a markdown file with attributes (parsed using front-matter):

```js
    if (file && file.attributes && file.attributes.tags && Array.isArray(file.attributes.tags)) {
      tags.push(...file.attributes.tags)
    }
```

Instead, now with Optional chaining you could write:

```js
    if (Array.isArray(file?.attributes?.tags)) {
      tags.push(...file.attributes.tags)
    }
```

More readable (although this can be discussed) and definitely more concise!

# Optional chaining, the weird parts

Syntax is syntax, you have to accept it and use it wisely to avoid being a [shitty coder](http://shittysomething.com/).

## Function calls

Bare with me, this is going to look slightly weird at first.

Let's take the above example, a markdown file that can have attributes, and the `attributes` has a function that determines if some tags (e.g. for a blog post) have been defined or not.

The function could be called `hasTags`, and we need to filter out files that have tags:

```js
const filesWithTags = files.filter(file => file?.attributes?.hasTags?.())
```

Notice the `?.()` part, where we first need to check if the `hasTags` function is available, and the "optionally call it".

This could be an interesting use-case for optional chaining that comes into mind.

## Dynamic properties

Same goes if you are using property access on an object:

```js
const propertyName = 'attributes'
const filesWithProperty = files.filter(file => file?.[propertyName])
```

## Using together with `nullish coalescing`

Read more about [nullish coalescing](/posts/2020-05-01-Nullish-coalescing-in-Node.js-14/).

An practical example could be to `map` all markdown files to their tags.

If a markdown files doesn't have tags, we would like to give to **default** to the array `['post']`:

```js
const allTags = files.reduce((tags, file) => tags.concat(file?.attributes?.tags ?? ['post']), [])
```

In this way, `allTags` will be an array of all parsed tags in the markdown files, and if no tags have been found for a file, it uses the default tags `['post']`.

---

For more in-depth explanation, I strongly suggest to skim through [this blog post on v8.dev](https://v8.dev/features/optional-chaining) where Optional chaining is discussed way more in depth.

<blockquote><p>Portions of this page are modifications based on work created and <a href="/terms#site-policies">shared by the V8 project</a> and used according to terms described in <a href="https://creativecommons.org/licenses/by/3.0/">the Creative Commons 3.0 Attribution License</a>.</p></blockquote>
