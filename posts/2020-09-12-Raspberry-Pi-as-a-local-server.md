---
title: "Raspberry Pi as a local server"
date: 2020-09-12
layout: post.njk
tags:
  - post
  - featured
  - raspberrypi
image: /assets/images/posts/rpi-mac/rpi-mac-lan.jpg
---

Doing an experiment with my RPi 4, using it as a small but powerful local server.

My current PC is a 10 year old Macbook Pro 13" 2010, which is sluggish sometimes.

So I want to offload some heavy tasks (ffmpeg time-lapse creation, long-running tasks and services) to the Raspberry Pi and connect to it either via LAN or Wi-Fi.

Below you can read my findings about performance, compatibility and general issues I encountered and tried to solve. 

---

## Table of Contents <!-- omit in toc -->

- [First steps](#first-steps)
- [Connection via LAN to PC](#connection-via-lan-to-pc)
  - [Internet Sharing from PC to RPi](#internet-sharing-from-pc-to-rpi)
- [Connection via Wi-Fi](#connection-via-wi-fi)
- [Benchmarking Transfer speeds via iperf](#benchmarking-transfer-speeds-via-iperf)
    - [Benchmark over Wi-Fi](#benchmark-over-wi-fi)
    - [Benchmark over LAN](#benchmark-over-lan)


# First steps

I started by:

- Flashing a minimal RaspiOS Buster Lite image on a 32GB SD card
- No setup of Wi-Fi connectivity through `wpa_supplicant`
- Creating an empty `ssh` file in the SD card to enable SSH access

Powered up the Pi and I was able to connect via LAN


# Connection via LAN to PC

![rpi mac lan](/assets/images/posts/rpi-mac/rpi-mac-lan.jpg)

Connecting the RPi to my MBP through LAN was the first thing I wanted to try.

The Pi is now available on my PC as `raspberrypi.local`.


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


# Benchmarking Transfer speeds via iperf

Did a simple benchmark using `iperf`, once using Wi-Fi and once using the direct ethernet connection to my PC.

Here are the results:

- LAN transfer speeds (Mac - RPi): 900+MBits/s
- WLAN transfer speeds (Mac - RPi): 60+MBits/s)

Makes total sense, still interesting.

### Benchmark over Wi-Fi

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

### Benchmark over LAN

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

