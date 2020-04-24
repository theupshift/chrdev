---
title: Resuming Elixir by self hosting plausible analytics
date: 2020-04-24
layout: post.njk
tags:
  - post
  - featured
  - elixir
  - myelixirstatus
  - plausible-analytics
  - journey
image: /assets/images/posts/elixir/elixir.png
---

As soon as Elixir was released a few years ago, I got into it and started learning and building software on top of it.

Thanks to the help of some [dear](https://twitter.com/pdincau) [colleagues](https://twitter.com/joebew42) I had the opportunity to get valuable feedback and learn even more concepts about GenServers, the BEAM virtual machine, ETS and Erlang+Elixir in general.

I post-poned this too much now, it's time to get back to the distributed world of programming, so, without further ado, below my Journey to get my hands dirty with Elixir, the BEAM and [plausible analytics](http://plausible.io/)!

---

# 2020/04/23

Forked the repo -> [christian-fei/plausible](https://github.com/christian-fei/plausible)

# 2020/04/24

Updated to latest elixir version with `brew upgrade elixir`.

Was on 1.9.1, 1.10.2 iss the latest stable release at the time of writing.

![elixir 1.10.2 installation](/assets/images/posts/elixir/elixir-1.10.2-installation.png)

---

Watched ["Elixir: A Mini-Documentary 2018"](https://doc.honeypot.io/elixir-documentary-2018/), very interesting video about the Elixir's history, touching on topics from the BEAM virtual machine, IoT scalability and general usage on the web services that can handle million of connections.

[![elixir mini documentary](/assets/images/posts/elixir/elixir-mini-documentary.png)](https://doc.honeypot.io/elixir-documentary-2018/)

