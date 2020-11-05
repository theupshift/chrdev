---
title: "Communicating with Bangle.js Watch over BLE with Node.js"
date: 2020-11-03
layout: post.njk
tags:
  - post
  - bangle
  - nodejs
  - iot
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

Put this code in the file `index.js`:

```js
Bangle.on('accel',function(a) {
  var d = [Math.round(a.x*100), Math.round(a.y*100), Math.round(a.z*100)];
  Bluetooth.println(d.join(","));
})
```

This way, your Bangle will send it's Accel values over BLE (Bluetooth Low Energy) continuously!

# Node.js

On the Node.js side, I have set up some code to 

- discover BLE devices (the Bangle.js specifically)
- Connect to it and read the Accel values broadcasted over Bluetooth

This is the idea

```js
var noble = require('@abandonware/noble')

noble.startScanning()
noble.on('stateChange', function(state) {
  console.log('stateChange', state)
})
noble.on('discover', periphalDiscovered)
```

The function `peripheralDiscovered` connects to the Watch, reads the Accel values and moves the Computer mouse accordingly!

Are you interested in reading more?

Let me know on [Twitter @christian_fei](https://twitter.com/christian_fei) or mail me at hey [at] cri [dot] dev