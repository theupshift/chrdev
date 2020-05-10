---
title: "Elixir trick: start an Observer window with mix"
date: 2020-05-10
layout: post.njk
tags:
  - post
  - elixir
  - elixirlang
  - myelixirstatus
  - journey
---

Yesterday I wanted to monitor the processes that my Elixir application was spawning.

I knew there was something called `Observer`, but couldn't remember exactly how to do it.

Taking a look at the doc, I found this [debugging page](https://elixir-lang.org/getting-started/debugging.html#observer) that mentioned `:observer.start()`.

The suggested usage was with `iex -S mix` and then running `:observer.start()` in the `mix` shell manually.

I don't like manual things that much.

---

You can achieve the same, if you need to run your app with `mix run --no-halt` in the following way:

```elixir
mix run --no-halt --eval ":observer.start"
```

This will run your app (without halting) **and** spawn a process monitor window!

If you're interested, here the repo where I needed the proces monitor:

[https://github.com/christian-fei/elixir_monitor_crypto](https://github.com/christian-fei/elixir_monitor_crypto)

![elixir process monitor](/assets/images/posts/elixir/elixir-process-monitor.png)

