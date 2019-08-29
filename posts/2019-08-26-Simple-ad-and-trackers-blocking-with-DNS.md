---
title: Simple ad and trackers blocking with DNS
date: 2019-08-26
layout: post.njk
tags: post
---

You can use your [`hosts` file](https://en.wikipedia.org/wiki/Hosts_(file)) to redirect all traffic in a local black hole (namely 0.0.0.0)

```
sudo vi /etc/hosts
```

Add the following lines (plus hosts you find out by yourself) to `/etc/hosts` and save it:

```
0.0.0.0 google-analytics.com
0.0.0.0 www.google-analytics.com
0.0.0.0 googletagmanager.com
0.0.0.0 www.googletagmanager.com
0.0.0.0 hn.inspectlet.com
0.0.0.0 api.segment.io
```

if you check the network tab in your browser, you will see something like this:

![block](data:image/png;base64,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)