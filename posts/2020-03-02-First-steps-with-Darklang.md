---
title: First steps with Darklang
date: 2020-03-02
layout: post.njk
tags:
  - post
  - featured
  - darklang
image: https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

# What is it?

> Programming language, editor, and infrastructure for building backends

Functional / imperative hybrid language is influenced by  Elm, Rust, OCaml, Swift, Ruby on Rails, Clojure, TypeScript.

Dark is for building backends and tries to remove accidental complexity from coding.

- Dark uses a set of structural backend components
- Dark follows the concept of Trace-Driven-Development: you to develop from incoming requests/traces (using your traces, live values, play buttons, and return values).
- Working safely in Dark relies on feature flags
- Dark is designed for continuous delivery — the practice of frequently making small, low-risk changes. Code that you write is deployed to “production” (typically behind a feature flag) immediately after being written.


### Statically-typed Functional Languages

> once it compiles, it usually works first try

Dark takes influence from FPs, and Dark programs are fully type-checked.

Dark’s type system allows us to find everywhere that a change needs to propagate, and tells you whether your types line up or not.

We also use Results and Options instead of exceptions and nulls, to avoid all the problems that come from those language features.

Dark uses a concept called [Railway Oriented Programming](https://fsharpforfunandprofit.com/posts/recipe-part2/) to reduce this complexity. ROP is a metaphor where the error values of Results and Options form an alternate execution path through the program, called an Error Rail. When an error happens, the execution in the main body stops and instead passes over to the Error Rail.

Dark

- is Statically-typed

- is a Functional / imperative programming language

- is Declarative and Expression based

- has Immutable values

- has Results and Options

- and much more

# Working with Dark

For me there are three main points:

- Feature flags
- Deployless
- Continuous Delivery


*Feature flags*: Working safely in Dark relies on feature flags (temporarily unavailable in the current beta)

*Deployless*: You don’t hit compile or build or even git push your code

*Continuous Delivery*: the practice of frequently making small, low-risk changes. Code that you write is deployed to “production” (typically behind a feature flag) immediately after being written.


# Railway oriented programming

A concept I never heard about before, that comes from the *F#* world apparently.

It's a metaphor where the Error values create an alternate execution path through the program, called an Error Rail.

Here you can read more about [Railway oriented programming in Dark](https://medium.com/darklang/real-problems-with-functional-languages-efe668c5264a) and other functional concepts

![Railway oriented programming](/assets/images/posts/dark/railway.png)


# Trace Driven Development

> Send requests to Dark *before writing code*

```
curl -X POST -H 'Content-Type: application/json' https://yourcanvasid.builtwithdark.com/ --data '{"foo":42}'
```

Once you have requests/traces, you can use them while writing code.

![tdd](/assets/images/posts/dark/tdd1.png)

If you put your cursor on a trace you'll the see the result of that execution on the left-hand side.

![tdd](/assets/images/posts/dark/tdd2.png)


# Dark Backend Components

Infrastructure of your backend is simplified via Dark in **five building blocks**:
- HTTP - HTTP endpoints
- DB - datastores
- WORKER - background workers
- CRON - scheduled jobs
- REPL - internal tools

![dark backend components](/assets/images/posts/dark/backend-components.png)

## REST API Endpoints

* If you hit an endpoint that does not exist, the endpoint will appear in the 404 section (see: [Trace Driven Development](https://darklang.github.io/docs/trace-driven-development)).
* Accept url parameters (ex: /profile/:username) and appear as variables within the handler.
* Have implicit returns (a Functional aspect of Dark), and return JSON by default.
* All traces are available as dots on the left-hand-side of the code block. If you do not have a trace selected, you will see a spinner for all live values.

## Background Workers

Workers receive events via the **emit** expression, and will appear in the 404 section if you emit to a non-existent worker.

Run asynchronously and retry in case of failure.

## CRON

Runs on a given schedule, selected by developer (every minute, hour, week, etc).

## REPL

Is triggered only by the developer and frequently relies on play buttons (see  [Trace Driven Development](https://darklang.github.io/docs/trace-driven-development) ).

## Persistent Datastores

In Dark, all datastores are a key-value store - a persistent hashmap/dictionary (not a relational database). When looking at a Datastore you’ll see the schema, all handlers that call the datastore, how many entries are in it, and a sample entry.

![dark backend components](/assets/images/posts/dark/datastores.png)

# The Editor

Code written in Dark is literally written on a `<canvas>` element, also the name "canvas" of the "workspace" concept the Dark team came up with.

You write your code in your Web Browser (I think they currently support Chrome).

That's interesting and quite different from what we're probably used to.

![editor](/assets/images/posts/dark/editor1.png)

There is also no parser for the language, the editor manipulates the AST directly and only valid code is instantly deployed.

![editor](/assets/images/posts/dark/editor2.png)



# Quotes about Darklang

Quotes that could give a better idea about dark.

> “We keep adding things, but we never take things away. AWS has 200 services and never takes any away”

Dark introduces the concept of **Deployless backends** (term coined by Jessie Frazelle)

> “Just as there are servers in serverless, there are deployments in deployless, you just don’t have to think about it”— Paul Biggar


---

PS: this is the whole language spec:

```haskell
type expr =
  | Integer of string
  | String of string
  | If of expr * expr * expr
  | Variable of string
  | FnCall of string * expr list
  | Lambda of string list * expr
```


# Links

Here some links to get started today!

- [darklang docs](https://darklang.github.io/docs/introduction)
- [language spec](https://ops-documentation.builtwithdark.com/?pretty=1)
