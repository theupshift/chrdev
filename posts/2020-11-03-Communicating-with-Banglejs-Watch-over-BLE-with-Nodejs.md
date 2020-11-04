---
title: "Communicating with Bangle.js Watch over BLE with Node.js"
date: 2020-11-03
layout: post.njk
tags:
  - draft
  - post
  - featured
  - bangle
  - nodejs
  - iot
image: https://cri.dev/assets/images/posts/bangle/bangle.png
---

This is a short summary of what I learned while playing around with my Bangle.js Watch.

I managed to

- add an application to the Bangle.js (with `create-bangle-app`)
- send accelerometer data over Bluetoot Low Energy
- discover & connect to BLE devices with Node.js
- read accelerometer data with Node.js (coming from the watch)

---

# Bangle.js app

The simplest way to get started is to install `create-bangle-app` and read about [Creating Bangle.js Apps](https://github.com/espruino/BangleApps/#getting-started)

```sh
npm i -g create-bangle-app
```

Simply create a bangle app with `create-bangle-app my-first-app`


