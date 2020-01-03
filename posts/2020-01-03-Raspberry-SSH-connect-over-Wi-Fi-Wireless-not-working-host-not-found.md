---
title: Raspberry SSH over Wi-Fi not working
date: 2020-01-03
layout: post.njk
tags:
  - post
---

Having trouble SSH'ing to your Raspberry Pi over Wi-Fi?

Same here..

Here some troubleshooting steps that may solve your issue:

## Is ssh running on Raspberry Pi?

Connect to Raspberry Pi over GUI and run in a terminal:

```
systemctl status ssh
```

and you should see something like this:

```
pi@raspberrypi:~ $ systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-01-03 17:46:03 CET; 1h 28min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 2394 (sshd)
    Tasks: 1 (limit: 2077)
   Memory: 3.7M
   CGroup: /system.slice/ssh.service
           └─2394 /usr/sbin/sshd -D
...
```

## Is Raspberry Pi connected to the Internet?

Connect to Raspberry Pi over GUI and run `ifconfig` to see your network configuration:

```
ifconfig
```

Under `wlan0` you should see something like:

```
wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.110  netmask 255.255.255.0  broadcast 192.168.1.255
...
```

As you can see, the Raspberry Pi assigned address is `192.168.1.110`.

## Is router configuration OK? (AP Isolation)

If everything else seems fine, it's most likely related to a setting in the router (as it was in my case).

A setting of your router called `AP Isolation` (access point isolation) is forbidding your PC to connect to the Raspberry Pi over Wi-Fi.

I'm not sure *why* turning it off solved it, for more [info see here](https://www.tp-link.com/us/support/faq/2089/).

Stumbled upon [this solution](https://raspberrypi.stackexchange.com/questions/62341/ssh-over-wifi-not-working) on stackoverflow, and **disabling AP Isolation** made me again SSH into my Raspberry Pi.

![ap-isolation](/assets/images/posts/ap-isolation.png)



*Note: by disabling this setting you probably expose yourself to potential attacks, do it at own risk*