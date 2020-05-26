---
title: "Upgrade HTTP requests with X-Forwarded-Proto Header in HAProxy"
date: 2020-05-26
layout: post.njk
tags:
  - post
  - haproxy
  - tutorial
---

Recently I stumbled upon an issue with an web application that was proxied by HAProxy.

The issue was that the requests that started from the HTML document were served and requested over HTTPS, but "inner" resources (AJAX calls, images, etc.) were configured as HTTP.

![without-x-forwarded-proto](/assets/images/posts/haproxy-forwarded-proto/without-x-forwarded-proto.png)

This was causing a **Mixed Content** error in the Chrome developer console:

![mixed-content](/assets/images/posts/haproxy-forwarded-proto/mixed-content-error.png)

To solve this, you can instruct the proxy to upgrade requests sent between the client and the load balancer to a specific protocol namely HTTPS:

```bash
backend app1
  http-request set-header X-Forwarded-Proto https if { !ssl_fc }
  server app1 127.0.0.1:1234
```

![with-x-forwarded-proto](/assets/images/posts/haproxy-forwarded-proto/with-x-forwarded-proto.png)

---

For more info, refer to the following resources:

- [MDN X-Forwarded-Proto](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto)
- [HAProxy Official Documentation](https://www.haproxy.com/documentation/aloha/8-0/traffic-management/lb-layer7/http-rewrite/#set-a-header-in-the-response)
- [Mixed Content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content)
