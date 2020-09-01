---
title: "Watermark images with montage (ImageMagick)"
date: 2020-09-01
layout: post.njk
tags:
  - post
  - photography
  - unix
---

The simplest way I found to watermark [my timelapse images](/posts/2020-09-01-Simple-Timelapse-with-a-Raspberry-Pi/) is with [`montage`](http://www.imagemagick.org/Usage/montage/).

I'm using this in my [raspberry-pi-timelapse](https://github.com/christian-fei/raspberry-pi-timelapse/blob/master/take-snapshot):

```sh
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PATH_TO_IMAGE=example.jpg

montage \
  -label "$DATE" \
  $PATH_TO_IMAGE \
  -pointsize 30 \
  -gravity Center \
  -geometry +0+0 \
  $PATH_TO_IMAGE
```

This will add a simple watermark (with white background) at the bottom of the image, like this:

![watermarked-example.jpg](/assets/images/posts/watermarked-example.jpg)
