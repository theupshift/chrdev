---
title: "Fix npm process killed during npm install"
date: 2020-11-04
layout: post.njk
tags:
  - post
  - tutorial
  - nodejs
  - outofmemory
---

This happened to me recently, and I couldn't understand the cause.

"Suddenly", after updating some npm packages, my npm install was "not working".

It exited abrubtly with status code 137, with the error message "Killed".

---

To solve it, I started to investigate memory consumption with `htop`.

In fact, I was using all 1GB, and didn't **set up any swap** 🤭

To solve this, I followed [these instructions](https://stackoverflow.com/questions/38127667/npm-install-ends-with-killed)

```sh
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl vm.vfs_cache_pressure=50
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
```

Viewing `htop`

```
  CPU[|                                              0.7%]   Tasks: 46, 207 thr; 1 running
  Mem[||||||||||||||||||||||||||||||||||||||||  317M/981M]   Load average: 0.70 0.36 0.13
  Swp[                                           0K/1024M]   Uptime: 00:01:22
```

After a renewed `npm install`, I was able to install the npm dependencies.

This is what the output of `htop` looked like

```
  CPU[||                                             2.0%]   Tasks: 54, 230 thr; 1 running
  Mem[||||||||||||||||||||||||||||||||||||||||||342M/981M]   Load average: 0.00 0.00 0.00
  Swp[|||||||||||||||||||                      365M/1024M]   Uptime: 00:02:34
```

