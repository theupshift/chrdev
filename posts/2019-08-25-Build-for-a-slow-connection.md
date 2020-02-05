---
title: Build for a slow connection
date: 2019-08-25
layout: post.njk
tags:
  - post
  - general
  - featured
image: https://images.unsplash.com/photo-1485402073834-c95f3eac2fcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

# speed matters

![kbps.png](/assets/images/posts/build-for-a-slow-connection/kbps.png)

trying to work on your pc in 2019 is the worst if you are experiencing a slow internet connection.

you check the network tab and hope that these was the last few bytes downloaded. but no. it was just the beginning.

i'm not gonna even start ranting about web apps with bloated js, that make you wonder who were the geniuses that built that site, and how much they got paid. but they are using react, angular and rx.js, don't worry.

# sorry for the waiting

![gdrive-offline.png](/assets/images/posts/build-for-a-slow-connection/gdrive-offline.png)
![gdrive-slow-2.png](/assets/images/posts/build-for-a-slow-connection/gdrive-slow-2.png)

in these scenarios it's best to avoid working on the pc, or instead do something offline if possible.

for your mental sanity.

# let's slow down

we need to start thinking with slow internet speeds in mind.

you don't need the new framework or fatty library in your project, drop it.

try to tree-shake your bundle if you are so inclined.

but keep it simple, please.

# 503

the web breaks sometimes.

requests fail, errors happend. in my opinion error handling is a very neglected topic and it comes to the cost of the end user.

# keep it simple

try it for yourself. avoid js if you can even. that would be awesome (this applies especially to blogs).

[pagespeed](https://developers.google.com/speed/pagespeed/insights/) your site, and simulate slow connections. is it still pleasant to browse your site?

check your deps, and choose carefully, it's going to cost a lot in the end.

does your site load below 100ms? can you interact with it within 200ms?

---

let me know what you think

![pagespeed.png](/assets/images/posts/build-for-a-slow-connection/pagespeed.png)
