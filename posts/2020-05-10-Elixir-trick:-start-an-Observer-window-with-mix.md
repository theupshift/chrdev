---
title: "Elixir trick: start an Observer window with mix"
date: 2020-05-10
layout: post.njk
tags:
  - post
  - featured
  - elixir
  - elixirlang
  - myelixirstatus
  - journey
image: /assets/images/posts/elixir/elixir.png
---

Yesterday I wanted to monitor the processes that my Elixir application was spawning.

I knew there was something called `Observer`, but couldn't remember exactly how to do it.

Taking a look at the doc, I found this [debugging page](https://elixir-lang.org/getting-started/debugging.html#observer) that mentioned `:observer.start()`.

The suggested usage was with `iex -S mix` and then running `:observer.start()` in the `mix` shell manually.

I don't like manual things that much.

---

You can achieve the same, if you need to run your app with `mix run --no-halt` in the following way:

```sh
mix run --no-halt --eval ":observer.start"
```

This will run your app (without halting) **and** spawn a process monitor window!

Alternatively, you can achieve the same using `IEx`:

```sh
iex --eval ":observer.start" -S mix
```

If you're interested, here the repo where I needed the process monitor:

[https://github.com/christian-fei/elixir_monitor_crypto](https://github.com/christian-fei/elixir_monitor_crypto)

![elixir process monitor](/assets/images/posts/elixir/elixir-process-monitor.png)

## Update

As suggested by [Aleksei on Twitter](https://twitter.com/mudasobwa/status/1260851431189483520) you could do something like to always, automatically start the observer window, and have `IEx` functionality at the same time:


```sh
echo ':observer.start()' >> .iex.exs
```

Then, you can run your usual `iex -S mix` and enjoy process monitoring!