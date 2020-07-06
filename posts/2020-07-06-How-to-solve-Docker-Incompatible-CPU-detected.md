---
title: "How to solve Docker 'Incompatible CPU detected'"
date: 2020-07-06
layout: post.njk
tags:
  - post
  - docker
  - mac
---

If you're getting an error while trying to install Docker on an older MacBook (e.g. MacBook 7,1 8,1 9,1) here's how to solve it.

```
Environment Error

Incompatible CPU detected

We are sorry, but your hardware is incompatible with Docker Desktop.

Docker requires a process with virtualization capabilities and hypervisor support.
```

You can verify that your Processor is incompatible by checking the output of the following command:

```sh
sysctl kern.hv_support
```

If the output is `kern.hv_support: 0`, then you have confirmed you have an incompatible MacBook Pro.

But no worries, just download the "Docker Toolbox" for Mac.

From here [https://docs.docker.com/toolbox/toolbox_install_mac/](https://docs.docker.com/toolbox/toolbox_install_mac/)

And you're good to go. You don't even need to manually install VirtualBox, it does it by itself.
