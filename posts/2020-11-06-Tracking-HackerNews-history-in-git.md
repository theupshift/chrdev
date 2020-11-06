---
title: "Tracking HackerNews history in git"
date: 2020-11-06
layout: post.njk
tags:
  - post
  - featured
  - hackernews
  - scraping
  - automation
image: https://cri.dev/assets/images/posts/hn-diff.png
---

First of all: this is based on the idea of https://simonwillison.net/2020/Oct/9/git-scraping/ and https://github.com/simonw/ca-fires-history

The gist:

- every 20min
  - scrape hackernews frontpage items
  - save them in `hn.json`
  - commit and push

Find the git repository here at [christian-fei/hn-history](https://github.com/christian-fei/hn-history)

The schedule is done with the following GitHub Workflow file:

```yml
name: scrape hn data

on:
  push:
  workflow_dispatch:
  schedule:
    - cron:  '5,25,45 * * * *'

jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
    - name: checkout
      uses: actions/checkout@v2
    - name: fetch hndata
      run: |-
        npx @christian_fei/hn --json | jq . > hn.json
    - name: Commit and push if it changed
      run: |-
        git config user.name "Automated"
        git config user.email "actions@users.noreply.github.com"
        git add -A
        timestamp=$(date -u)
        git commit -m "Latest data: ${timestamp}" || exit 0
        git push
```

The data is scraped with `@christian_fei/hn` using the `--json` flag.

[Read more about it here](/posts/2020-11-06-Test-driving-a-HackerNews-scraper-with-Nodejs/)

# Git diff FTW

The diff looks actually quite comprehensive:

```
   {
     "title": "Hooking Up Our Custom OS to a Standard Library",
     "url": "https://blog.stephenmarz.com/2020/10/25/hooking-up-our-custom-os-to-a-standard-library/",
-    "upvotes": 18,
+    "upvotes": 22,
     "author": "azhenley",
     "comments": null,
     "link": "https://news.ycombinator.com/item?id=25008953"
   },
+  {
+    "title": "HP ends its customers' lives [redefines 'lifetime' deal]",
+    "url": "https://pluralistic.net/2020/11/06/horrible-products/#inkwars",
+    "upvotes": 143,
+    "author": "samizdis",
+    "comments": 66,
+    "link": "https://news.ycombinator.com/item?id=25008894"
+  },
   {
     "title": "Gron – Make JSON Greppable",
     "url": "https://github.com/tomnomnom/gron",
-    "upvotes": 247,
+    "upvotes": 252,
     "author": "capableweb",
-    "comments": 58,
+    "comments": 59,
     "link": "https://news.ycombinator.com/item?id=25006277"
   },
   {
     "title": "Double Robotics",
     "url": "https://angel.co/company/double-robotics/jobs/73583-operations-and-supply-chain-manager"
   },
-  {
-    "title": "HP ends its customers' lives [redefines 'lifetime' deal]",
-    "url": "https://pluralistic.net/2020/11/06/horrible-products/#inkwars",
-    "upvotes": 118,
-    "author": "samizdis",
-    "comments": 47,
-    "link": "https://news.ycombinator.com/item?id=25008894"
-  },
   {
     "title": "Ask HN: As a person, what can I do to improve a city?",
     "url": "item?id=25007697",
-    "upvotes": 231,
[diff] Changes to 'hn.json' - line 74 of 346                                                                                                                                                                                               34%
```
