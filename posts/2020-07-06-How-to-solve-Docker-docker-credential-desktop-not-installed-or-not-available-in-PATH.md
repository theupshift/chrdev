---
title: "How to solve Docker 'docker-credential-desktop not installed or not available in PATH'"
date: 2020-07-06
layout: post.njk
tags:
  - post
  - docker
  - mac
---

If you're getting the following error, I found the solution for it:

``` 
dockerpycreds.errors.InitializationError: docker-credential-desktop not installed or not available in PATH
[8929] Failed to execute script docker-compose
```

The issue is that during the installation a wrong entry in `~/.docker/config.json` was created.

Namely `credsStore` instead of `credStore`. 

Just change the entry in `~/.docker/config.json` like this, and you're good to go:

```json
{
  "stackOrchestrator" : "swarm",
  "experimental" : "disabled",
  "credStore" : "desktop"
}
```
