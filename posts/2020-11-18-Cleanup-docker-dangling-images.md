---
title: "Cleanup docker dangling images"
date: 2020-11-18
layout: post.njk
tags:
  - post
  - docker
---

A dangling Docker image is an unused image, meaning that it has not been assigned or used in a container.

Docker keeps those dangling images, forever, if you don't clean them up.

This will clear all dangling images:

```
docker images prune -f
```


**In my case, this helped to free 10GB+**

![10gb docker](/assets/images/posts/docker-prune.png)
