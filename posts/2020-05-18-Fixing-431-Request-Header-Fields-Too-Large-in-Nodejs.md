---
title: "Fixing 431 Request Header Fields Too Large in Node.js"
date: 2020-05-18
layout: post.njk
tags:
  - post
  - nodejs
  - javascript
  - featured
image: /assets/images/posts/node.js.png
---

You're seeing a blank page saying "HTTP_ERROR 431"? 

And you're running a Node.js HTTP server, like express or fastify?

This Node.js CLI flag can help:

```sh
--max-http-header-size=16384
```

Running `node --help` states:

```sh
  ...
  
  --max-http-header-size=...                set the maximum size of HTTP headers (default: 8KB)

  ...
```

It sets the HTTP Max Headers Size to 16KB.

This is due to a "recent" (November 2018) change in Node.js.

Namely a fix for a discovered vulnerability ["Denial of Service with large HTTP headers (CVE-2018-12121)"](https://nodejs.org/en/blog/vulnerability/november-2018-security-releases/#denial-of-service-with-large-http-headers-cve-2018-12121).

The Fix says:

```
All versions of 6 and later are vulnerable and the severity is HIGH. 

By using a combination of many requests with maximum sized headers (almost 80 KB per connection), and carefully timed completion of the headers, it is possible to cause the HTTP server to abort from heap allocation failure. 

Attack potential is mitigated by the use of a load balancer or other proxy layer.
```

The gist is that 

> The total size of HTTP headers received by Node.js now must not exceed 8192 bytes.

In other words if your query string, cookies sent along with your HTTP requests exceed **8KB**, Node.js is replying to the client with the error above.

It wasn't immediate to find the solution to this, and I actually would advise to not increase the limit if absolutely necessary and you have valid motivations.

The problem is most likely with the management of cookies on the client side, excessive query strings or a combination of both.

The fix for the CVE makes total sense, thus: **know what you're doing**.
