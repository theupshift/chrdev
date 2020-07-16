---
title: "How to fix possible EventEmitter memory leak detected"
date: 2020-07-16
layout: post.njk
tags:
  - post
  - tutorial
  - nodejs
---

The warning `possible EventEmitter memory leak detected` happens when you have more than 10 listeners (read EventEmitter) attached to an event.

First of all, try to understand how this can be the case. Most of the times it's a developer mistake that can be solved easily by cleaning up the code.

It was added to help finding memory leaks.

If it's needed and an intention, you'll need to run `process.setMaxListeners(0)` (or `process.setMaxListeners(Infinity)`) to disable this warning.

The node process won't report this warning anymore on the console.

See the [official docs](https://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n)

