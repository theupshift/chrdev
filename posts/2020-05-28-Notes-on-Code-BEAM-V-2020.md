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
image: /assets/images/posts/beam-v/code-beam-v.png
---

What: [Code BEAM V official website](https://codesync.global/conferences/code-beam-v/)

When: 2020/05/28 - 2020/05/29

Where: On the interwebz

Schedule: [code-beam-v#schedule](https://codesync.global/conferences/code-beam-v/#schedule)


Table of talks:

#### Day 1

- [Opening Keynote - The Future of Programming](#opening-keynote---the-future-of-programming)
- [Building adaptive systems](building-adaptive-systems)
- [Adopting Erlang, Adapting Rebar](#adopting-erlang-adapting-rebar)
- [Elixir meets Erlang in Blockchain development](#elixir-meets-erlang-in-blockchain-development)
- [Elixir update](#elixir-update)
- [Closing Keynote - The Tyranny of Structurlessness](#closing-keynote---the-tyranny-of-structurlessness)

#### Day 2

- [Opening Keynote - Problem led Software Design](#opening-keynote---problem-led-software-design)
- [How the BEAM will change your mind](#how-the-beam-will-change-your-mind)
- [Gleam: Lean BEAM typing machine](#gleam-lean-beam-typing-machine)
- [Cotonic: browser coroutines with an universal MQTT message bus](#cotonic-browser-coroutines-with-an-universal-mqtt-message-bus)

# Opening Keynote - The Future of Programming

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

![assets/images/posts/beam-v/beam-os.png](/assets/images/posts/beam-v/beam-os.png)

The BEAM has always been "cloud-native", not relying on particular OS or distribution.

The BEAM helps to abstract away from Distribution, abstract away from OS.

Letting you Focus on business logic.

![assets/images/posts/beam-v/osi-1.png](/assets/images/posts/beam-v/osi-1.png) 

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

![assets/images/posts/beam-v/osi-2.png](/assets/images/posts/beam-v/osi-2.png) 

**Abstract the infrastructure**

Hopefully in the future, we won't be talking about Kubernetes, Lambdas, Docker-compose and abstract away the infrastructure.

Let's stop talking about tools, let's focus on valid, rock-solid abstractions.

This will help to avoid making software developers also Network Engineers.

If you don't have the correct abstractions in place, you are going to have problems evolving with time.

If you don't have a tool that is abstracted away on layer 7, let it be.

![assets/images/posts/beam-v/osi-other.png](/assets/images/posts/beam-v/osi-other.png) 

["The future is concurrent, distributed and properly abstracted!"](https://twitter.com/FrancescoC/status/1266004584679563264)

*Images kindly provided by Francesco Cesarini*

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


**Architecture**

The FSM (finite state machine) handles channel protocol.

Watcher detects on-chain activity.

State Cache helps restore off-chain state.

![assets/images/posts/beam-v/elixir-blockchain.png](/assets/images/posts/beam-v/elixir-blockchain.png)



**State Channels**

Created Off-chain. Speed, scalability. Still Trustless.

Off-chain as in "no-chain".

You pass tokens back and forth until the contract is concluded. It could take 10 minutes or 6 months.

Your smart contract is the "protocol" you're defining. Deploy the contract in the state channel.

**coin-toss casino example**

![assets/images/posts/beam-v/coin-toss.png](/assets/images/posts/beam-v/coin-toss.png)

More info here on [github.com/aeternity](https://github.com/aeternity) and [aeternity.com](https://aeternity.com/)



# Elixir update


Current version Elixir 1.10, January 2020. 900 contributors. 10k+ packages on hex.pm. 1.3B+ downloads.

**Erlang/OPT21+ requirement**

This because Elixir fully integrates with Erlang's new logger, everything is shared.

New guards: `is_map_key/2` and `is_struct/1`.

**Compilation tracers**

Compilation in Elixir is the same as execution code.

This is because you can conditionally define functions and modules.

```elixir
defmodule MyMod do
  if OtherMod.some_condition? do
    def some_fun do
      ...
    end
  end
end
```

This is where compilation tracers come into play. Receive a bunch of events (compile module, define functions, etc.).

Useful for static code analysers.

Important foundation for the language.

**Compilation environment**

Application environment is read at compile time, not at run time.

![assets/images/posts/beam-v/compile-env.png](/assets/images/posts/beam-v/compile-env.png)

You can now use `Application.compile_env` to read variables at run time.

**ExUnit Pattern Diffing**

If you're interested in just a few fields of a struct, now Eixir gives you more readable traces.

![assets/images/posts/beam-v/ex-unit-diffing.png](/assets/images/posts/beam-v/ex-unit-diffing.png)


**Future**

1.11 in October 2020!

`Calendar.strftime/3` for datetime formatting

New log levels, notice, critical alert and emergency.

Warnings if using modules from non-dependencies.

Read Erlang docs from the Elixir Shell!

**Phoenix LiveDashboard**

Comes with every new phoenix application (v1.5 and up).

Request logging, metrics etc.


# Closing Keynote - The Tyranny of Structurlessness

> How more meaningful code can make your project more resilient & maintainable

People want more and more from applications as times goes on!

-> Complexity grows at an exponentional rate.

-> more flexible and easier to scale

Let's focus on **domain** and **structure**!

**Good elixir**

Functional core, imperative shell

Inner data manipulation in clean isolated environment, actions runs on the outer layer (side-effects).

Another leayer between the outer layer and functional core: Semantic DSL / OO

Decouple imperative outer shell with inner pure-logic function core.

Brings to higher reuse of code.

**Testing**

Prop + model testing for function core.

Huge gains and cleaner code.

**Tradeoffs**

- Exchange granular control for structure
- humans over machines
- meaning over mechanics
- safer!

**Actor Abyss**

Each step is very simple in an actor-based application.

Reasoning about dynamic organisms is difficult.

Complexity grows faster.

**Composition**

Composition is at the heart of modularity

Orthogonality is at the heart of composition

![assets/images/posts/beam-v/composition.png](/assets/images/posts/beam-v/composition.png)

**no reinventing the wheel**

GenServers etc are pretty low level! Add semantics to them!

A common example 

```elixir
def get(map, key, default \\ nil)

%{a: 1} |> Map.get(:b, 4)
#=> 4

def fallback(nil, default), do: default
def fallback(val, _), do: value

%{a: 1} |> Map.get(:b) |> fallback(4)
#=> 4

[] |> List.first() |> fallback(:empty)
#=> :empty
```

So instead of adding a third parameter to every function that implements the Enumerable protocol, you can abstract that semantic away!


**good interfaces != good abstractions**

Find a common interface with higher higher semantic density (focused on meaning not mechanics)

Define front-end and back-end interfaces well (could be sync and async!)

Declarative, configurable data flow, super extensible:

```elixir
defimple Dataflow, for: %Stream{}
defimple Dataflow, for: %Distributed{}
defimple Dataflow, for: %Broadway{}
```

**Summary**

Protocols super useful for DDD

Add a semantic layer to your application code, based on your domain

Test your distributed system by looking at the properties

Prop-testing useful for structured abstractions


# Opening Keynote - Problem led Software Design

Boyd Multerer and Robert Virding

**The Erlang Problem**

How can we improve the programming of Telephone applications? Very complex to build and maintain.

- Handling very large number of concurrent activities
- perform certain actions within a certain time
- system distributed over several computers
- maintainance without stopping the system
- fault tolerance for hardware failures and software errors

These are not problems just for telecom!

**Internal development**

- many threads at the same time
- understanding and evolving the problem domain
- designing language and arch
- testing the idea and how it would perform

Erlang tested in Ericsson in project ACS/Dunder. The first users of Erlang in a real product

Doing lots of experiments and testing in the real world.

**First principles**

Lightweight concurrency,  async communication.
Process isolation (no effect on other processes), error handling (detect and handle errors), with soft real-time, non-blocking features.

Language/system should be simple, with a high level language to get real benefits.

Provide tools for building systems, not solutions. Basic operations needed for building communication protocols and error handling.

---

"Build for the future", so that your solutions don't bring to new problems, but the other way around.

Try to think of the problems you're not solving.

Think about the Actual problems, problems of purpose.

Problem Discovery! In Erlang they ahd the problems of the platform, because to test the platform in real live you need a real life problem and application. Kinda chicken-and-egg problem.


**Scenic**

By XBOX founder

OTP based control hierarchy, fast process based restarts

**Jelly theory of development**

Software is never really finished. If you touch it, it's gonna mold, change and adapt.

It's a continuous development and hacking target, Discover new  problems emerging from usage.

Checkout key10.com and Scenic!


# How the BEAM will change your mind

*By Laura M. Castro*

Like when in functional programming world you say, "you need to change your mind".

On an abstract level FP advocates sound fine, but getting more practical and approaching it is a different thing.

**The imperative approach**

"The God complex"

You see all data, you have control over all of it, you know it all (algorithm).

**The object-oriented approach**

"The Despicable master"

Small buckets of data, the bucket know about themselves.

The buckets don't know about each other. They can be seen as minions that do small tasks on their own data.

A master is still needed to orchestrate all together.

**The functional approach**

"The BEAM approach"

Each process has their own duties, can go bad but the world needs to go on. The processes can be supervised and monitored.

Eventually all characters work together and a result, a stable situation is reached.


**Example: Project degree assignment process**

- each student is a process
- each assignment is a process
- administration process, knows if students fulfil criteria and marks
- statistical information process

All supervised.


Example application: https://gitlab.com/lauramcastro/sorted

Could have gone with imperative approach.

Pros:

- increased reliability
- distributed responsibility
- concurrent execution

Cons:

- harder to control
- harder to exaplin
- harder to test

**Take aways**

- paradigms do affect the way you think
- strength and weaknesses
- respect the paradigm
- not everything is a nail


# Gleam: Lean BEAM typing machine

*By Louis Pilfold*

BEAM and Erlang created to support multiple phone calls at once, failsafe system and perform a great number of tasks at the same time.

Erlang is a unit of concurrency. Erlang is a unit, how many tasks can be handled per second.

Named after Agner Erlang.

Each thread / process handles a single unit, and can be sequential.

"It is difficult to write a web server to handle 2 million session. But it's easy to write 1 server, and replicate it 2 million times" - Joe

No shared state between process, but instead communicates by sending messages between each other.

Distributed computing features built into the BEAM, process can send messages between each other between the same computer or a cluster of computers.

If something goes wrong, the error is contained in the smallest possible sub-system: an erlang process.

In this sense, BEAM is similar to Kubernetes, although no shared state and more granular when it comes to fail-over. 

They operate at a different level of abstraction.

The BEAM, almost by chance, became super useful for webservers, databases, queues, other systems!

Languages on the BEAM: Erlang, Elixir, Gleam and others.

The BEAM gives us a the tools to tolerate mistakes, e.g. Bugs in production!

**Gleam and ML languages**

Compiler as a tool, as a pair programming buddy that gives you hint what might go wrong.

Complementing the fault tolerance of the BEAM, with the compiler and static analysis of Gleam.

Helps reduces and minimize the feedback loop before going to production with an error introduced by a programmer.

Gleam tries to be a type-safe version of OTP and Erlang!

**Offensive programming**

If your business logic expects something to work, don't be defensive on it.

Assert that every step worked as expected and return as soon as possible if there is an error.

Let is crash!

Differentiate on errors:

- user input
- "expected" errors (network failures, external services down)
- unexpected errors (Oops)

[gleam.run](https://gleam.run)


# Cotonic: browser coroutines with an universal MQTT message bus











**WIP**

# Useful resources

- [codesync.global/media/](https://codesync.global/media/) : a gigantic collection of excellent articles and videos
- [Comparison between BEAM and JVM](https://www.erlang-solutions.com/blog/optimising-for-concurrency-comparing-and-contrasting-the-beam-and-jvm-virtual-machines.html)
