---
title: "Simple Timelapse with a Raspberry Pi"
date: 2020-09-01
layout: post.njk
tags:
  - post
  - featured
  - raspberry
  - iot
  - hardware
image: https://images.unsplash.com/photo-1552283576-3ea3519bf12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

Timelapses always fascinated me. So I wanted to create one on my own.

Had a spare **Raspberry Pi Zero W** catching dust, you can purchase one for ~ 25$ and the related **Raspberry Pi Camera module** for < 20$.

---

### Requirements

To build your own you'll need

- [Raspberry Pi](https://www.raspberrypi.org/) (model Zero W works pretty good)
- [Raspberry Pi Camera Module](https://www.raspberrypi.org/products/raspberry-pi-high-quality-camera/)
- 16GB SD Card or bigger
- (optionally Wi-Fi connectivity for easy access)

There is even an official [High Quality Camera](https://www.raspberrypi.org/products/raspberry-pi-high-quality-camera/), that will give even better quality timelapses!

## Table of contents

- [Preparation](#preparation)
  - [Flash the Pi](#flash-the-pi)
  - [Set up Wi-Fi connectivity](#set-up-wi-fi-connectivity)
  - [Enable SSH access](#enable-ssh-access)
  - [Enable Camera module](#enable-camera-module)
- [Create the timelapse](#create-the-timelapse)
  - [Take image with raspistill](#take-image-with-raspistill)
  - [Schedule capture with crontab](#schedule-capture-with-crontab)
  - [Create timelapse with ffmpeg / avconv](#create-timelapse-with-ffmpeg--avconv)
  - [Directory listing of snapshots](#directory-listing-of-snapshots)
- [raspberry-pi-timelapse repository](#raspberry-pi-timelapse-repository)

## Preparation

### Flash the Pi

You'll need to flash Raspberry Pi OS on a fresh SD Card.

Either with [Balena Etcher](https://www.balena.io/etcher/) or the official [Raspberry Pi Imager](https://www.raspberrypi.org/downloads/). The procedure is extremely straight forward.

Just go through the steps and you have Rasperry Pi OS installed on a SD card.


### Set up Wi-Fi connectivity

To get the Pi connect to your Wi-Fi, you'll need to create a file called `wpa_supplicant.conf` in the SD card.

The contents of `wpa_supplicant.conf` should look like this (configure it accordingly):

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
ap_scan=1
update_config=1

network={
  scan_ssid=1
  ssid="YOUR_WIFI_ACCESS_POINT"
  psk="YOUR_WIFI_PASSWORD"
}
```


### Enable SSH access

To enable SSH access (with the user `pi` and password `raspberry`), simply create an empty file (without extension), called `ssh` in the SD card.


### Enable Camera module

To enable to camera module, you can configure it through the `raspi-config` utility.

But also with the file `config.txt` in SD card.

Open it and add the following to it:

```
start_x=1
gpu_mem=128
```

Just make sure there are no other occurrencies for `start_x` or `gpu_mem`

# Create the timelapse

## Take image with raspistill

> `raspistill` is the command line tool for capturing still photographs with the camera module.

The idea is to take a snapshot every x minutes using `raspistill`

To take a single image, I'm using the following bash script called `/home/pi/take-snapshot`:

```sh
#!/bin/bash

set -e

DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SNAPSHOTS_DIR=/home/pi/snapshots
SNAPSHOT_PATH="$SNAPSHOTS_DIR/$DATE.jpg"
CURRENT_PATH="$SNAPSHOTS_DIR/current.jpg"

echo "$DATE"
mkdir -p "$SNAPSHOTS_DIR"
echo "taking snapshot $SNAPSHOT_PATH"
raspistill \
	--width 1280 \
	--height 960 \
	--quality 100 \
	--output "$SNAPSHOT_PATH"
echo "snapshot saved $SNAPSHOT_PATH"

echo "adding watermark $SNAPSHOT_PATH"
cd $SNAPSHOTS_DIR
montage \
  -label "$DATE" \
  $SNAPSHOT_PATH \
  -pointsize 30 \
  -gravity Center \
  -geometry +0+0 \
  $SNAPSHOT_PATH

cp $SNAPSHOT_PATH $CURRENT_PATH
```

This script will take a snapshot, name it in the format `%Y-%m-%dT%H:%M:%SZ.jpg` and put it in the folder `/home/pi/snapshots`.

At the end this photo is also watermarked using `montage` from the ImageMagick family.


## Schedule capture with crontab

To take a photo every 5 minutes using the above script, you can set up a simple cron job for that.

Just run `crontab -e` to edit the cron schedules and add the following lines

```
SHELL=/bin/bash
*/5 * * * * sh /home/pi/take-snapshot >> /home/pi/snapshots.log 2>&1
```


## Directory listing of snapshots

You can expose a web server on port 80 to easily list all images (and timelapses) taken in the folder `/home/pi/snapshots`.

Start the server at boot by adding the following to your crontab

```
@reboot sudo python3 -m http.serve --directory /home/pi/snapshots 80
```


## Create timelapse with ffmpeg

Taking a timelapse for the day `2020-08-31` with ffmpeg is as easy as running

```sh
cat 2020-08-31*.jpg | ffmpeg -r 10 -i - -vf scale=1280:-2 timelapse-2020-08-31.mp4
```


# raspberry-pi-timelapse repository

You can clone / fork the repo [christian-fei/raspberry-pi-timelapse](https://github.com/christian-fei/raspberry-pi-timelapse) and create your first timelapse in no time.

There are various scripts that simplify the steps above:

- `take-snapshot` to take a watermarked and timestamped photo in the folder `snapshots/`
- `server` to start a HTTP server on port 80 listing all snapshots and timelapses taken so far
- `rsync-snapshots` to sync the snapshots to from the Raspberry Pi to your PC
- `create-timelapse` to create a timelapse for a specific date
- `crontab` to schedule the snapshots and spin up the server