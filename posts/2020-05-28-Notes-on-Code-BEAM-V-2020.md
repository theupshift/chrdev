---
title: 'Notes on "Code BEAM V 2020"'
date: 2020-05-28
layout: post.njk
tags:
  - post
  - featured
  - elixir
  - elixirlang
  - myelixirstatus
image: /assets/images/posts/elixir/elixir.png
---

What: [Code BEAM V official website](https://codesync.global/conferences/code-beam-v/)

When: 2020/05/28 - 2020/05/29

Where: On the interwebz

Schedule: [code-beam-v#schedule](https://codesync.global/conferences/code-beam-v/#schedule)

# Notes

## Opening Keynote - The Future of Programming

"It was crazy building soft near-realtime system 20 years ago" ~ Casarini

"Erlang is actually a Domain-Specific-Language written in C, tell your managers that and they'll buy that"


JVM for speed and parallelism.

BEAM for scalability and concurrency.

The predecessor of the BEAM was the JAM: Joe's Abstract Machine!

**Looking at the future**

Distribution: no worries about threads breaking, corrupting your memory, introduces latency, but is pretty fast at the end of the day.

The future is distributed.

**BEAM**

The BEAM can be seen as an OS with a hypervisor on top of your OS.

![assets/images/posts/beam-v/beam-os.png](/assets/images/posts/beam-v/beam-os.png)

The BEAM has always been "cloud-native", not relying on particular OS or distribution.

The BEAM helps to abstract away from Distribution, abstract away from OS.

Letting you Focus on business logic.

![assets/images/posts/beam-v/beam-osi.png](/assets/images/posts/beam-v/beam-osi.png)

You should be able to focus mostly just on the business side of programming, the actual business logic.

Erlang/Elixir helps you with that by e.g. using a gen-server and implementing just call or cast calls, without spending time on the underlying complexity.

**Programming Model**

Many different programming models

- Functional Reactive
- Lamdbas
- Event-driven
- Pub/Sub
- Actor Model

OTP will let you scale both vertically and horizontally, with a simple programming model.

**WIP**

# Useful resources

- [codesync.global/media/](https://codesync.global/media/) : a gigantic collection of excellent articles and videos
- [Comparison between BEAM and JVM](https://www.erlang-solutions.com/blog/optimising-for-concurrency-comparing-and-contrasting-the-beam-and-jvm-virtual-machines.html)
