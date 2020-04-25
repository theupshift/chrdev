---
title: Resuming Elixir by self hosting plausible analytics
date: 2020-04-24
updated: 2020-04-25
layout: post.njk
tags:
  - post
  - featured
  - elixir
  - elixirlang
  - myelixirstatus
  - plausibleanalytics
  - journey
image: /assets/images/posts/elixir/elixir.png
---

As soon as Elixir was released a few years ago, I got into it and started learning and building things with it.

Thanks to the help of some [dear](https://twitter.com/pdincau) [colleagues](https://twitter.com/joebew42) I had the opportunity to get valuable feedback and learn even more concepts about GenServers, the BEAM virtual machine, ETS and Erlang+Elixir in general.

I also went to my first Erlang+Elixir conf, and had the chance & honour to meet Joe Armstrong, ![#rememberingjoe](https://twitter.com/christian_fei/status/1119726548498767873?s=21).

On 2020/04/22, during quarantine, I decided to get back to Elixir (who knows: maybe even dabble with Erlang directly).

I post-poned this too much now, it's time to get back to the distributed programming world.

Without further ado, below my journey (in form of a daily journal) about learning more about Elixir (again), the BEAM, [plausible analytics](http://plausible.io/) and things discovered along the way!

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

# 2020/04/25

Started following these accounts on Twitter:
- [@elixirlang](https://twitter.com/elixirlang)
- [@elixirdigest](https://twitter.com/elixirdigest)
- [@ErlangSolutions](https://twitter.com/ErlangSolutions)
- [@chris_mccord](https://twitter.com/chris_mccord)
- [@elixirstatus](https://twitter.com/elixirstatus)
- [@gregyoung](https://twitter.com/gregyoung)
- [@ElixirTip](https://twitter.com/ElixirTip)
- [@elixirforum](https://twitter.com/elixirforum)

Then this happened

[![greg young tweet](/assets/images/posts/elixir/greg-young-tweet.png)](https://twitter.com/gregyoung/status/1253843890114899969)

# Getting started with the `plausible` elixir code

```bash
git clone git@github.com:christian-fei/plausible.git
cd plausible
```

Download deps

```bash
mix deps.get
```

Run the tests

```bash
mix test
```

This yields the error about the missing postgresql connection

```bash
09:11:52.095 [error] GenServer #PID<0.6248.0> terminating
** (DBConnection.ConnectionError) tcp connect (localhost:5432): connection refused - :econnrefused
    (db_connection) lib/db_connection/connection.ex:87: DBConnection.Connection.connect/2
    (connection) lib/connection.ex:622: Connection.enter_connect/5
    (stdlib) proc_lib.erl:249: :proc_lib.init_p_do_apply/3
Last message: nil
** (Mix) The database for Plausible.Repo couldn't be created: killed
```

So,let's boot up a postgresql instance with `docker`:

```bash
docker run -d -p 5432:5432 -v postgres-data:/var/lib/postgresql/data --name postgres1 postgres
```

Now all the tests run fine, as expected:

```bash
~/D/p/plausible (master) mix test
.........................................................................................................................................................................................................................

Finished in 5.6 seconds
217 tests, 0 failures

Randomized with seed 396356
```

# Running locally with `mix phx.server`

```bash
mix phx.server
```

Got the error

```bash
[error] Postgrex.Protocol (#PID<0.5924.0>) failed to connect: ** (Postgrex.Error) FATAL 3D000 (invalid_catalog_name) database "plausible_dev" does not exist
```

Solved with `mix ecto.create`:

```bash
~/D/p/plausible (master) mix ecto
Ecto v3.4.2
A toolkit for data mapping and language integrated query for Elixir.

Available tasks:

mix ecto.create        # Creates the repository storage
mix ecto.drop          # Drops the repository storage
mix ecto.dump          # Dumps the repository database structure
mix ecto.gen.migration # Generates a new migration for the repo
mix ecto.gen.repo      # Generates a new repository
mix ecto.load          # Loads previously dumped database structure
mix ecto.migrate       # Runs the repository migrations
mix ecto.migrations    # Displays the repository migration status
mix ecto.reset         # Alias defined in mix.exs
mix ecto.rollback      # Rolls back the repository migrations
mix ecto.setup         # Alias defined in mix.exs
~/D/p/plausible (master) mix ecto.create
The database for Plausible.Repo has been created
```

Run the migrations:

```bash
~/D/p/plausible (master) mix ecto.migrate

11:16:39.587 [info]  == Running 20181201181549 Plausible.Repo.Migrations.AddPageviews.change/0 forward

11:16:39.589 [info]  create table pageviews

11:16:39.604 [info]  == Migrated 20181201181549 in 0.0s

11:16:39.636 [info]  == Running 20181214201821 Plausible.Repo.Migrations.AddNewVisitorToPageviews.change/0 forward

11:16:39.636 [info]  alter table pageviews

11:16:39.638 [info]  == Migrated 20181214201821 in 0.0s

...

```

Almost there:

```bash
~/D/p/plausible (master) mix phx.server
[info] Running PlausibleWeb.Endpoint with cowboy 2.7.0 at 0.0.0.0:8000 (http)
[error] Could not start node watcher because script "/Users/christian/Documents/projects/plausible/assets/node_modules/webpack/bin/webpack.js" does not exist. Your Phoenix application is still running, however assets won't be compiled. You may fix this by running "cd assets && npm install".
[info] Access PlausibleWeb.Endpoint at http://localhost:8000
```

I had to compile the `assets` with `npm install`, after that, everything seems fine:

```bash
~/D/p/plausible (master) mix phx.server
[info] Running PlausibleWeb.Endpoint with cowboy 2.7.0 at 0.0.0.0:8000 (http)
[info] Access PlausibleWeb.Endpoint at http://localhost:8000

webpack is watching the files…
```

Uuuuuuuh! It's working!

![plausible-localhost.png](/assets/images/posts/elixir/plausible-localhost.png)

### Registering 127.0.0.1:8080

![plausible-registration.png](/assets/images/posts/elixir/plausible-registration.png)

Included the following script on my blog to set up local tracking:

```html
<script async defer data-domain="127.0.0.1" src="https://plausible.io/js/plausible.js"></script>
```

Clicked the activation link printed in the console, instead of the email (since the email wasn't sent).

---

While I set up the local tracking for `127.0.0.1:8080`, I noticed that the website wasn't registering.

It kept showing "Waiting for first pageview on 127.0.0.1:8080"

So, looking through the source, I noticed that in the files `p.js` and `plausible.js`, there was a guard to ignore local tracking:

```js
if (/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname)) return ignore('website is running locally');
```

Commented this line, and my local site is finally set up!

![plausible-127.0.0.1-tracking.png](/assets/images/posts/elixir/plausible-127.0.0.1-tracking.png)



# to be continued