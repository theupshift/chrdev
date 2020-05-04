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
hackernews: https://news.ycombinator.com/item?id=23073109
---

**Sick of ads on the Web?**

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

<p class="alert">
  Get the latest on clean code, node.js, testing and more
  <br/>
  <a class="sidebar-cta" target="_blank" href="https://buttondown.email/christianfei">
    Subscribe to my newsletter!
  </a>
</p>

## Configure the Router or individual devices

If you don't want to fiddle around with your **router configuration**, you can configure each device indidually.

That's the easiest method I find. For more information see [discourse.pi-hole.net](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245).

On your devices, head over to the **DNS settings**, and set **as the only DNS server address** the Raspberry's IP:

On iOS

![pi-hole-settings-ios.png](/assets/images/posts/pi-hole/pi-hole-settings-ios.png)

On Mac OS

![pi-hole-settings-mac.png](/assets/images/posts/pi-hole/pi-hole-settings-mac.png)

## Verify DNS resolution

To verify that the Raspberry Pi is used for DNS resolution, you can use a simple trick.

I used [`dig`](https://linux.die.net/man/1/dig) tointerrogate DNS name servers, like this:

```sh
dig +trace cri.dev
```

You'll see a similar output (check for your Raspberry's IP address):

```sh
~ dig +trace cri.dev

; <<>> DiG 9.10.6 <<>> +trace cri.dev
;; global options: +cmd
.			509447	IN	NS	a.root-servers.net.
.			509447	IN	NS	b.root-servers.net.
.			509447	IN	NS	c.root-servers.net.
.			509447	IN	NS	d.root-servers.net.
.			509447	IN	NS	e.root-servers.net.
.			509447	IN	NS	f.root-servers.net.
.			509447	IN	NS	g.root-servers.net.
.			509447	IN	NS	h.root-servers.net.
.			509447	IN	NS	i.root-servers.net.
.			509447	IN	NS	j.root-servers.net.
.			509447	IN	NS	k.root-servers.net.
.			509447	IN	NS	l.root-servers.net.
.			509447	IN	NS	m.root-servers.net.
.			509447	IN	RRSIG	NS 8 0 518400 20200516050000 20200503040000 48903 . NtC6ObYfTRgLakuNLhMl ...
;; Received 525 bytes from 192.168.1.127#53(192.168.1.127) in 60 ms

...
```
As you can see, the Raspberry Pi's IP address (*192.168.1.127* on port [53](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)) is first interrogated for the DNS resolution.

## Admin Panel

Pi-hole's **administration panel** can be accessed at `http://{PI_IP_ADDRESS}/admin` and optionally configure it further.

Personally, I prefer to set the **DNS resolver privacy level** to *Anonymous mode* so that even in your own home-network your privacy is respected.

![pi-hole-anonymous-mode.png](/assets/images/posts/pi-hole/pi-hole-anonymous-mode.png)


## Donate to pi-hole

Head over to [pi-hole.net/donate/](https://pi-hole.net/donate/) and if you're feeling generous, **support pi-hole** for the greater good.

![pi-hole-donate.png](/assets/images/posts/pi-hole/pi-hole-donate.png)