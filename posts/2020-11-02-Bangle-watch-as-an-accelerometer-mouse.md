---
title: "Bangle watch as an accelerometer mouse"
date: 2020-11-02
layout: post.njk
tags:
  - post
  - featured
  - bangle
  - iot
  - nodejs
image: https://cri.dev/assets/images/posts/bangle/bangle.png
twitterthread: https://twitter.com/christian_fei/status/1323375121600516101
---

Recently I got myself a threat: a Bangle.js Watch! ⌚️

It's a pretty awesome, open-source watch based on Espruino and Node.js, and much more! 🤓

Read about my experiments here especially for creating a mouse-watch app with Node.js and Bluetooth Low Energy!

---

![bangle watch](/assets/images/posts/bangle/bangle.png)

First of all, what is Bluetooth Low Energy?!

With Bluetooth 4.0+ you get BLE, which provides considerably reduced power consumption and lower cost Bluetooth connectivity.

Range is about the same as "classic" Bluetooth.

Read more about BLE 📚

https://en.wikipedia.org/wiki/Bluetooth_Low_Energy

https://www.samsung.com/in/support/mobile-devices/what-is-bluetooth-low-energy-ble-technology/

# Smart Watch

Bangle.js, aka Nodewatch is "The World's first Open Source

Hackable Smart Watch"

Bangle.js is waterproof and AI enabled and comes with bluetooth low energy, GPS, a heart rate monitor, accelerometer and more! 🎸

Read more about the features, specs and ecosystem on https://banglejs.com/

For documentation refer to https://www.espruino.com/Bangle.js

With the `espruino` npm package, I am able to discover BLE devices.

Here for example my Bangle.js Watch is discovered

![espruino cli](/assets/images/posts/bangle/espruino-cli.png)

To develop apps for it, I found a nifty npm package called `create-bangle-app`.

It worked, after a few adjustments.

Nevertheless, I used it to continually broadcast the Accell values over BLE.

So the watch sends x, y, z accel values over Bluetooth!

![bangle-code](/assets/images/posts/bangle/bangle-code.png)

# Connect to Bangle with Node.js

Then on the Node.js side, I have a script that discovers BLE devices and connects to the Bangle Watch.

![noble](/assets/images/posts/bangle/noble.png)

To read the BLE message payload, I simply check if the contents look correct (an array of 3 numbers for x, y, z accel)

Once the new mouse position is calculated, I can use `robotjs` to move the mouse to the correct position:

![nodejs-ble-message](/assets/images/posts/bangle/nodejs-ble-message.png)

