---
title: Ad blocking with Raspberry Pi and Pi-hole
date: 2020-05-03
layout: post.njk
tags:
  - post
  - raspberry
  - adblocking
  - featured
image: /assets/images/posts/pi-hole/pi-hole.png
---

**Sick of ads on the Web, YouTube and other services?**

Do you have a **Raspberry Pi** (4, 3, or even a Zero like me) laying around collecting dust and you want to make us of it?

Use it for **ad-blocking** in your home network and to finally browse the web, watch videos etc. without annoying ads.

---

![pi-hole-dashboard.png](/assets/images/posts/pi-hole/pi-hole-dashboard.png)

## One-liner install

Take out your Raspberry Pi from your forgotten drawer and **connect to it via SSH**.

Now run the following for a simple installation of [Pi-hole](https://pi-hole.net/):

```sh
curl -sSL https://install.pi-hole.net | bash
```

**Follow the on-screen instructions** based on your preferences (query logging, static IP etc.) and you're one-step away for a ad-free experience while browsing the Web.

*NB: Keep track of the password to access the admin panel!*

![pi-hole-password.png](/assets/images/posts/pi-hole/pi-hole-password.png)

## Configure the Router or individual devices

If you don't want to fiddle around with your **router configuration**, you can configure each device indidually.

That's the easiest method I find. For more information see [discourse.pi-hole.net](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245).

On your devices, head over to the **DNS settings**, and set **as the only DNS server address** the Raspberry's IP:

On iOS

![pi-hole-settings-ios.png](/assets/images/posts/pi-hole/pi-hole-settings-ios.png)

On Mac OS

![pi-hole-settings-mac.png](/assets/images/posts/pi-hole/pi-hole-settings-mac.png)

## Admin Panel

Pi-hole's **administration panel** can be accessed at `http://{PI_IP_ADDRESS}/admin` and optionally configure it further.

Personally, I prefer to set the **DNS resolver privacy level** to *Anonymous mode* so that even in your own home-network your privacy is respected.

![pi-hole-anonymous-mode.png](/assets/images/posts/pi-hole/pi-hole-anonymous-mode.png)


## Donate to pi-hole

Head over to [pi-hole.net/donate/](https://pi-hole.net/donate/) and if you're feeling generous, **support pi-hole** for the greater good.

![pi-hole-donate.png](/assets/images/posts/pi-hole/pi-hole-donate.png)
