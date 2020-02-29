---
title: Take a photo with raspistill on a Raspberry Pi
date: 2020-02-29
layout: post.njk
tags:
  - post
  - raspberry
  - tutorial
---

> `raspistill` is the command line tool for capturing still photographs with the camera module.

Here you can find the [official docs](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md).

I want to show you how you can set up a **cron schedule** to take a camera snapshot at a desired interval.

### Requirements

- a [Raspberry Pi Camera Module](https://amzn.to/2Tp5fuN) or [any other model](https://amzn.to/2TdKgfP) should be fine
- a [Raspberry Pi](https://amzn.to/2wkgDjC)

## About cron

[cron](https://en.wikipedia.org/wiki/Cron) enables you to set time-based jobs on a Unix OS.

In this example, the script `/home/pi/take-current-snapshot` is run every hour (notice the expression `0 * * * *`):

> Run `crontab -l` to list active cron schedules

```bash
# m h  dom mon dow   command
SHELL=/bin/bash
0 * * * * sh /home/pi/take-current-snapshot >> /home/pi/snapshots.log 2>&1
```

Additionally all logs are saved to `/home/pi/snapshots.log`

### Setting up the cron schedule

SSH into your Raspberry Pi and run the following to edit the cron schedule (`-e` stands for *edit*):

```
crontab -e
```

Add the following line to take a snapshot every hour (alternatively [create your own](https://crontab.guru/every-hour)):

```bash
0 * * * * sh /home/pi/take-current-snapshot >> /home/pi/snapshots.log 2>&1
```

## The `take-current-snapshot` script

Below you can find the script from [my garden project](https://github.com/christian-fei/garden/blob/master/take-current-snapshot).

It runs `raspistill` and saves the `current.jpg` camera snapshot to a desired path, default is `/home/pi/snapshots`.

You can change the variable `SNAPSHOT_PATH` to your needs.

```bash
#!/bin/bash

set -e

SNAPSHOT_PATH=/home/pi/snapshots
mkdir -p "$SNAPSHOT_PATH"
DATE=$(date +"%Y-%m-%d_%H%M")
SNAPSHOT_NAME="$DATE.jpg"
NOW_SNAPSHOT_PATH="$SNAPSHOT_PATH/$SNAPSHOT_NAME"
CURRENT_SNAPSHOT_PATH="$SNAPSHOT_PATH/current.jpg"
echo "taking snapshot $NOW_SNAPSHOT_PATH"

raspistill \
  -o "$NOW_SNAPSHOT_PATH"
  # --width 2048 \
  # --height 1536 \

echo "snapshot saved $NOW_SNAPSHOT_PATH"
cp "$NOW_SNAPSHOT_PATH" "$CURRENT_SNAPSHOT_PATH"
echo "saving current.jpg $NOW_SNAPSHOT_PATH"
```

Run `chmod +x take-current-snapshot` to make it an executable that can be run by cron.

You can now run `take-current-snapshot` to take a photo with your Raspberry Pi Camera module!


## Sync snapshots locally

From your computer, you can run `scp -r pi@yourpihost:/home/pi/snapshots ~/Desktop/` to sync the snapshots folder on the Raspberry Pi to your desktop.

---

✌️ [let me know](https://twitter.com/christian_fei) if this helps!