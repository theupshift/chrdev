---
title: "DIY IoT door monitor with ESP8266"
date: 2020-09-03
layout: post.njk
tags:
  - post
  - featured
  - iot
  - electronics
  - diy
---

## tldr; <!-- omit in toc -->

Using an ESP8266 for IoT projects makes me go fast while prototyping.

The compact format is perfect for small DIY devices.

Wi-Fi connectivity is built-in, and it's super affordable.

> The ESP8266 is a low-cost Wi-Fi microchip, with a full TCP/IP stack and microcontroller capability ([wikipedia](https://en.wikipedia.org/wiki/ESP8266))

The door monitor running in my home activates a buzzer when the proximity sensor detects that the door is opened.

Additionally, it creates an AP for Wi-Fi configuration using a Web interface, and can connect to a desired Wi-Fi network afterwards. [Read more about this below](#table-of-contents)

Source code can be found on [GitHub christian-fei/door-monitor-esp8266](https://github.com/christian-fei/door-monitor-esp8266)

```sh
git clone https://github.com/christian-fei/door-monitor-esp8266.git
```

![project photo](/assets/images/posts/door-monitor/project.jpg)


## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Circuit explanation](#circuit-explanation)
- [Grab the code](#grab-the-code)
  - [Install libraries for ESP8266](#install-libraries-for-esp8266)
    - [Adding the ESP8266 Board](#adding-the-esp8266-board)
    - [Additional libraries](#additional-libraries)
  - [Flash it](#flash-it)
  - [Try it out!](#try-it-out)
- [Demo](#demo)


## Requirements

To build your own, this is what you need:

- Microcontroller ESP8266 (LoLin)
- Active Piezo Buzzer
- Proximity Sensor FC-51
- optionally a breadboard

Arduino IDE or the Arduino Plug-in for VSCode will work fine for flashing the ESP8266.


## Circuit explanation

Here the schematics for the circuit

![schematics door monitor](/assets/images/posts/door-monitor/schematics.svg)

The piezo buzzer is connected to GPIO D6, as an `OUTPUT` pin.

The proximity sensor is connected to GPIO D5, as an `INPUT` pin.

When the proximity sensor detects that the door is open, the GPIO D5 pin will read `HIGH`.

This is when the piezo buzzer is activated, and a simple alarm sound is played.


## Grab the code

Clone the repository

```sh
git clone https://github.com/christian-fei/door-monitor-esp8266.git
```

Open the project with Arduino IDE by clicking on the `Gatekeeper.ino` file.

There is no need to change the code. 

### Install libraries for ESP8266

#### Adding the ESP8266 Board

Using the "Library Manager" in the Arduino IDE, you need to install support for ESP8266.

Here you can find [the official installation guide](https://arduino-esp8266.readthedocs.io/en/latest/installing.html#instructions)

#### Additional libraries

The project uses [`ESPAsyncTCP`](https://github.com/me-no-dev/ESPAsyncTCP/archive/master.zip) and [`ESPAsyncWebServer`](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip). 

Download both ZIP files, and add them either to your Arduino IDE installation libraries or via `Add .ZIP Library`.


### Flash it

Connect your ESP8266 via USB to your PC.

Select the `usbserial` port and `NodeMCU 1.0 (ESP - 12 E Module)` board in the Arduino IDE.

Click `Upload` and flash the ESP8266.


### Try it out!

Now you're ready to apply the board near a door you want to monitor.

The proximity sensor can both be placed on the door itself or on a wall near the door.

You'll need to calibrate the sensitivity of the sensor by rotating the potentiometer on the FC-51 chip.


## Demo