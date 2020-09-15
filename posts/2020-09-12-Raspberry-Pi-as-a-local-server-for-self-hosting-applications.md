---
title: "Raspberry Pi as a local server for self hosting applications"
date: 2020-09-12
layout: post.njk
tags:
  - post
  - featured
  - raspberrypi
  - opensource
  - self-hosting
image: /assets/images/posts/rpi-mac/rpi-mac-lan.jpg
---

Doing an experiment with my RPi 4, using it as a small but powerful local server.

My current PC is a 10 year old Macbook Pro 13" 2010, which is sluggish sometimes.

So I want to offload some heavy tasks (ffmpeg time-lapse creation, long-running tasks and services) to the Raspberry Pi and connect to it either via LAN or Wi-Fi.

Below you can read my findings about performance, applications and general issues I encountered and tried to solve.

---

## Table of Contents <!-- omit in toc -->

- [First steps](#first-steps)
- [Connection via LAN to PC](#connection-via-lan-to-pc)
  - [Internet Sharing from PC to RPi](#internet-sharing-from-pc-to-rpi)
- [Connection via Wi-Fi](#connection-via-wi-fi)
- [Benchmarking Transfer speeds via iperf](#benchmarking-transfer-speeds-via-iperf)
  - [Benchmark over LAN](#benchmark-over-lan)
  - [Benchmark over Wi-Fi](#benchmark-over-wi-fi)
- [Applications](#applications)
  - [ffmpeg for time-lapse](#ffmpeg-for-time-lapse)
  - [n8n for automation](#n8n-for-automation)
  - [emby for media server](#emby-for-media-server)
  - [hakatime](#hakatime)
  - [Tor proxy](#tor-proxy)
- [Final words](#final-words)


# First steps

I started by:

- Flashing a minimal RaspiOS Buster Lite image on a 32GB SD card (prob better for the future if I used a 128GB one)
- No setup of Wi-Fi connectivity through `wpa_supplicant`
- Creating an empty `ssh` file in the SD card to enable SSH access

Powered up the Pi and I was able to connect via LAN.

Additionally, I changed the hostname of the Raspberry Pi to `serverry` (through `raspi-config`).


# Connection via LAN to PC

![rpi mac lan](/assets/images/posts/rpi-mac/rpi-mac-lan.jpg)

Connecting the RPi to my MBP through LAN was the first thing I wanted to try.

The Pi is now available on my PC as `serverry.local`.


## Internet Sharing from PC to RPi

"Internet Sharing" from the PC to the Pi was super easy. 

Worked first try, just had to enable the internet sharing setting on my Mac:

![mac internet sharing](/assets/images/posts/rpi-mac/internet-sharing-mac.png)


# Connection via Wi-Fi

Set up a `wpa_supplicant.conf` in `/etc/wpa_supplicant/wpa_supplicant.conf` or place it 
in the root of the SD card.

This enables the Raspberry Pi to have independent internet connectivity.

Here is an example:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
ap_scan=1
update_config=1

network={
  scan_ssid=1
  ssid="YOUR_SSID"
  psk="YOUR_PSK"
}
```

Now the RPi is also available in my home-network under `serverry.fritz.box`


# Benchmarking Transfer speeds via iperf

Did a simple benchmark using `iperf`, once using Wi-Fi and once using the direct ethernet connection to my PC.

Here are the results:

- LAN transfer speeds (Mac - RPi): 900+MBits/s
- WLAN transfer speeds (Mac - RPi): 60+MBits/s)

Makes total sense, still interesting.

## Benchmark over LAN

```
~ iperf3 -c serverry.local
Connecting to host serverry.local, port 5201
[  7] local fe80::58b0:35ff:feef:3a64 port 62068 connected to fe80::b713:505e:420e:d16b port 5201
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-1.00   sec   111 MBytes   933 Mbits/sec
[  7]   1.00-2.01   sec  97.9 MBytes   817 Mbits/sec
[  7]   2.01-3.01   sec   110 MBytes   919 Mbits/sec
[  7]   3.01-4.01   sec   110 MBytes   929 Mbits/sec
[  7]   4.01-5.01   sec   107 MBytes   891 Mbits/sec
[  7]   5.01-6.01   sec   110 MBytes   925 Mbits/sec
[  7]   6.01-7.01   sec   109 MBytes   911 Mbits/sec
[  7]   7.01-8.01   sec   107 MBytes   902 Mbits/sec
[  7]   8.01-9.01   sec   108 MBytes   908 Mbits/sec
[  7]   9.01-10.00  sec   109 MBytes   916 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-10.00  sec  1.05 GBytes   905 Mbits/sec                  sender
[  7]   0.00-10.01  sec  1.05 GBytes   904 Mbits/sec                  receiver
```

## Benchmark over Wi-Fi

```
~ iperf3 -c serverry.fritz.box
Connecting to host serverry.fritz.box, port 5201
[  7] local 192.168.188.52 port 62063 connected to 192.168.188.53 port 5201
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-1.00   sec  8.18 MBytes  68.6 Mbits/sec
[  7]   1.00-2.00   sec  7.78 MBytes  65.2 Mbits/sec
[  7]   2.00-3.00   sec  7.77 MBytes  65.2 Mbits/sec
[  7]   3.00-4.00   sec  7.63 MBytes  63.9 Mbits/sec
[  7]   4.00-5.00   sec  7.24 MBytes  60.6 Mbits/sec
[  7]   5.00-6.00   sec  7.49 MBytes  63.2 Mbits/sec
[  7]   6.00-7.00   sec  7.28 MBytes  61.0 Mbits/sec
[  7]   7.00-8.08   sec  7.94 MBytes  61.6 Mbits/sec
[  7]   8.08-9.00   sec  6.25 MBytes  57.0 Mbits/sec
[  7]   9.00-10.12  sec  7.32 MBytes  54.8 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate
[  7]   0.00-10.12  sec  74.9 MBytes  62.1 Mbits/sec                  sender
[  7]   0.00-10.12  sec  74.9 MBytes  62.0 Mbits/sec                  receiver
```

# Applications

## ffmpeg for time-lapse

[Lately I've been busy with time-lapses](/posts/2020-09-01-Simple-Time-lapse-with-a-Raspberry-Pi/), and the process of creating one with ffmpeg on my MBP was getting slower and slower (seemingly).

Did a benchmark of creating a time-lapse of 20 FPS, based on 775 snapshots. The snapshots were taken every minute from 7AM til 8PM.

*There is to mention that the Pi has 4 cores 4GB RAM, while my MBP has 2 cores 8GB RAM.*

On the Raspberry Pi the `ffmpeg` process took **12m30s** to complete.

While on my MBP it took **20m**!

Almost twice as fast, daaamn!

*I think for more graphics intensive uses, the MBP would win though, since it has a Nvidia 320m, for what's worth*

This is a comparison of `htop` between both devices

Raspberry Pi

![time-lapse-cpu-rpi](/assets/images/posts/rpi-mac/time-lapse-cpu-rpi.png)

Macbook Pro 13" 2010

![time-lapse-cpu-mac](/assets/images/posts/rpi-mac/time-lapse-cpu-mac.png)


## n8n for automation

I wanted to use [n8n.io](https://n8n.io/) to automate some personal tasks, and create useful workflow automations.

There is an ARM build for n8n using docker, fortunately:

```sh
docker run -d --restart always --name n8n -p 5678:5678 -v ~/.n8n:/root/.n8n n8nio/n8n:0.78.0-rpi
```

You could also use `npx`, `npx n8n`

The dashboard is available via `http://serverry.local:5678`, you now have access to your local n8n instance.

## emby for media server

Recently discovered [emby.media](https://emby.media/).

It can be used as a personal library of your media files, for easy access, organization and streaming.

The installation was as easy as:

```sh
wget https://github.com/MediaBrowser/Emby.Releases/releases/download/4.5.0.25/emby-server-deb_4.5.0.25_armhf.deb -O emby-server.deb
sudo dpkg -i emby-server.deb
```

Emby is now available on `http://serverry.local:8096/`

## hakatime

Hakatime is a server implementation of [Wakatime](https://wakatime.com/).

Unfortunately, the docker image is not built for ARM, so it cannot work on the Pi.

I'm getting the classic error when spinning up the docker image:

```
standard_init_linux.go:211: exec user process caused "exec format error"
```

Will have to figure out how to build the project manually..

That's a pity though, I was super stoked to get Hakatime up and running :(

## Tor proxy

Managed to easily set up a tor proxy on the Raspberry Pi.

As easy as 

```sh
sudo apt install tor

echo "SocksPort 0.0.0.0:9050\nSocksPolicy accept *\nRunAsDaemon 1" >> /etc/tor/torrc

sudo systemctl restart tor@default.service
```

Now I can connect from my Mac to the RPi and browse via Tor.

```sh
# turn on
networksetup -setsocksfirewallproxy "Wi-Fi" "serverry.fritz.box" "9050" off

# turn off
networksetup -setsocksfirewallproxystate "Wi-Fi" off
```

Verify connectivity through [check.torproject.org](https://check.torproject.org/?lang=en)

![tor connectivity](assets/images/posts/rpi-mac/tor.png)

# Final words

So far the experience was pretty pleasant.

3 out of 4 use cases (ffmpeg, n8n, emby, hakatime) worked out of the box.

What I want to try out next is:

- [Tor Proxy](https://peppe8o.com/setup-a-tor-proxy-server-with-raspberry-pi-raspberry-pi-os-lite/) ✅
- [Inboxen](https://inboxen.org/): infinite number of unique inboxes
- [TriggerHappy](https://trigger-happy.readthedocs.io/en/latest/)
- [NextCloud](https://nextcloud.com/)
- [Zenbot](https://github.com/carlos8f/zenbot): trading bot
- [Firefly](https://www.firefly-iii.org/): personal finance
- A password manager, haven't decided yet


