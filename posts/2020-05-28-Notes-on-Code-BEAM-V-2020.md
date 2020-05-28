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

Table of talks:

- [Opening Keynote - The Future of Programming](#opening-keynote---the-future-of-programming)
- [Building adaptive systems](building-adaptive-systems)
- [Adopting Erlang, Adapting Rebar](#adopting-erlang-adapting-rebar)
- [Elixir meets Erlang in Blockchain development](#elixir-meets-erlang-in-blockchain-development)

## Opening Keynote - The Future of Programming

Talk 1 ~ 15:00 CEST

![assets/images/posts/beam-v/222-participants.png](/assets/images/posts/beam-v/222-participants.png)

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

<!-- ![assets/images/posts/beam-v/beam-os.png](/assets/images/posts/beam-v/beam-os.png) -->

The BEAM has always been "cloud-native", not relying on particular OS or distribution.

The BEAM helps to abstract away from Distribution, abstract away from OS.

Letting you Focus on business logic.

<!-- ![assets/images/posts/beam-v/beam-osi.png](/assets/images/posts/beam-v/beam-osi.png) -->

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

**Abstract the infrastructure**

Hopefully in the future, we won't be talking about Kubernetes, Lambdas, Docker-compose and abstract away the infrastructure.

Let's stop talking about tools, let's focus on valid, rock-solid abstractions.

This will help to avoid making software developers also Network Engineers.

If you don't have the correct abstractions in place, you are going to have problems evolving with time.

If you don't have a tool that is abstracted away on layer 7, let it be.

["The future is concurrent, distributed and properly abstracted!"](https://twitter.com/FrancescoC/status/1266004584679563264)

---

# Building adaptive systems

Talk 2 ~ 15:55 CEST - Chris Keathley

Request spikes happen. Overloads can be nightmares. Latencies are introduced.

This can happen for both internal and external services, DB, APIs, etc.

"All services have objectives". For example requests/second

A resilient service should be able to withstand a 10x traffic spike and continue to meet those objectives.

**Queues and Overloads**

Most systems boil down to queues.

It contains work that needs to be processed.

Overload happens:

Arrival Rate (how quick items show up) > Processing Time (how much it takes to process an item)

*Little's Law*

```
Elements in the queue = Avg Arrival Rate * Avg Processing Time
```

CPU pressure happens when too many BEAM processes are created, and not processed in time to empty the queue.

This slow down the queue and scheduler of the BEAM and things can fall apart.

**Overload Mitigation**

You need to get Arrival Rate and Processing Time under control.

It would be obvious to start dropping items from the queue.

The server that processes the queue items could drop requests, or queue items themself and eventually evict items. (Downstream solution)

You could also stop sending requests all together to the downstream server (Upstream solution). Mitigated the load on the downstream.

*Autoscaling*

Autoscaling is not a silver bullet.

If you DB is under load, and you auto-scale your server, you just made things worse.

You need to keep in mind the *Load shedding* into the equation.

*Circuit Breakers*

If a server is under load, you can shut off the traffic to that server and let it "heal".

Circuit breakers are your last line of defense.

Circuit breakers should be dynamic and adapted your domain. You cannot have a static circuit breaker in a dynamic domain of yours.

**Adaptive Concurrency**

Read papers about *Congestion Avoidance and Control*.

Resilient to failures, a self-healing internet and systems.

Dynamically discover **Adaptive limits** by probing your system and seeing the actual limit of services.

*Additive Increase Mutliplicative Decrease*

You backoff much faster than you grow.

Tools and ideas: fuse and regulator (on github).

**Backpressure**

Backpressure can work great for internal services, but for e.g. spike in users your system needs to dynamically adapt to the circumstances.



# Adopting Erlang, Adapting Rebar

It's easy to pick up a book, read the theories, but often get stuck in the more practical stuff.


Adopting Production Erlang:

**with docker**

- efficient building
  - cache deps with rebar.lock
  - store local hex package cache
- runtime concerns
  - busy wait (Erlangs' scheduler goes to sleep with a tight loop, burning your CPU)
  - schedulers
  - zombie processes

Most of the issues are fixed in OTP-23 and rebar 3 3.14

**with kubernetes**

Similar concerns as with docker. 

You will get throttled if you reach certain CPU limits.

**relx**

Predecessor of rebar3.

Previously standalone escript.

Slimmed down and sped up, simplified configurations.

Dev, prod, and minimal mode.


# Elixir meets Erlang in Blockchain development

Checkout Aeternity Blockchain!

**Trust and Useability**

Blockchains are trustless, distributed state-network.

Less cool: speed is terrible, useability is often quite bad.

This because useability comes to the cost of given trust to a certain authority.

**State Channels**

Created Off-chain. Speed, scalability. Still Trustless.

**Architecture**

The FSM (finite state machine) handles channel protocol.

Watcher detects on-chain activity.

State Cache helps restore off-chain state.







---

**WIP**

# Useful resources

- [codesync.global/media/](https://codesync.global/media/) : a gigantic collection of excellent articles and videos
- [Comparison between BEAM and JVM](https://www.erlang-solutions.com/blog/optimising-for-concurrency-comparing-and-contrasting-the-beam-and-jvm-virtual-machines.html)
