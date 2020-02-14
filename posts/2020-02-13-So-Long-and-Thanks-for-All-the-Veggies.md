---
title: So Long, and Thanks for All the Veggies
date: 2020-02-13
layout: post.njk
tags:
  - post
  - featured
  - general
image: https://images.unsplash.com/photo-1562805410-e01d91af55f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
js: /assets/js/p.js
---

# 🍅

As much as it hurts, this action had to be taken due to apparent trademark issues with the word <strong class="p">pomodoro</strong>.

<strong><strong class="p">pomodoro</strong>.cc has to close.</strong>

---

The creator of the P technique messaged me on 2020-02-10 on LinkedIn, essentially threatening me with legal action, to shut down <strong class="p">pomodoro</strong>.cc.

**arrogant people like this don't deserve my time**

The conversation contained a [link](https://francescocirillo.com/pages/pomodoro-trademark-guidelines) to his trademark guidelines and an example with the brand name "Armani".

Translated excerpt:

> Imagine that the brand is Armani… and you decide to create your Armani fashion line ... or Amani or any distortion. Same thing with Pomodoro.

Another point he made was

> I don't think it will be enough to change the name to return to the norm

Whatever *that* means...

**I don't have the time to follow this absurd legal case, it's too unproductive for me.**

This is the best moment to thank my users for the support,
at the same time I’m sorry that the service ended this way.

🍅

Let [me](https://twitter.com/christian_fei) and [him](https://twitter.com/cirillof) know what you think about this whole thing.

So Long, and Thanks for All the Veggies,

Christian

<p>
  <a target="_blank" href="https://twitter.com/share?url=https://christianfei.com{{page.url}}&text={{page.title}}&ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Share on Twitter</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> &nbsp; to let peeople know!
</p>


# Moving on

Below you can see some stats and numbers about the service: stats since 2014 and data since end 2018.

# Stats

Stats at the time of writing:

- ~ **6k** monthly users and ~ **12k** monthly page views
- ~ **28k** users and ~ **69k** page views in 2019
- ~ **88k** users  and ~ **320k** page views since September 2014
- ~ **50** minutes average session duration
- exceptional growth in February 2020 (see below for hypothesis)

### Growth in February
<img lazy="/assets/images/posts/fish/growth-february.png" />

This might be the most plausible reason for the timing of Cirillo's request. SEO and Twitter search apparently gave more weight to pomodoro.cc instead of to his own marketing stuff..

### Users online at time of writing
<img lazy="/assets/images/posts/fish/now.png" />

### Users January 2020
<img lazy="/assets/images/posts/fish/jan-2020.png" />

### Users 2019
<img lazy="/assets/images/posts/fish/2019.png" />

### Users since September 2014
<img lazy="/assets/images/posts/fish/all.png" />

# Data

Since `2018-11-25` I have data available for the latest version:

```
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.users.count()
1759

MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.pomodoros.count()
12076
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.pomodoros.aggregate([{$group: {_id: null, count: {$sum: '$minutes'}}}])
{ "_id" : null, "count" : 216933 }

MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.todos.count()
4693
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.todos.count({completed: true})
1540

MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.events.count()
63651
```


**1759** signed up users.

**12076** *timers* (not the veggie), **216933** minutes tracked by **logged in users**, around 3615 hours, 150 days.

**4693** todos tracked, of which **1540** completed.

**63651** events stored in the audit log.


<img lazy="/assets/images/posts/fish/how-can-pomodoro-be-a-trademark.jpg">

<img lazy="/assets/images/posts/pomodoro.cc.png">
