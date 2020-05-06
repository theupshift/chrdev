---
title: Resuming Elixir by self-hosting plausible analytics
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
hackernews: https://news.ycombinator.com/item?id=22996337
---

As soon as Elixir was released a few years ago, I got into it and started learning and building things with it.

Thanks to the help of some [dear](https://twitter.com/pdincau) [colleagues](https://twitter.com/joebew42) I had the opportunity to get valuable feedback and learn even more concepts about GenServers, the BEAM virtual machine, ETS and Erlang+Elixir in general.

I also went to my first Erlang+Elixir conf, and had the chance & honour to meet Joe Armstrong, [#rememberingjoe](https://twitter.com/christian_fei/status/1119726548498767873?s=21).

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

# Self hosting and license

Seems all sorted out right away.

The repository on Github states:

> Can Plausible be self-hosted?
> At the moment we don't provide support for easily self-hosting the code. Currently, the purpose of keeping the code open-source is to be transparent with the community about how we collect and process data.

And about the license:

> Plausible is open-source under the most permissive MIT license. There are no restrictions on redistributing, modifying or using this software for any reason.

Let's go then!

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
<script async defer data-domain="127.0.0.1" src="http://localhost:8000/js/plausible.js"></script>
```

Clicked the activation link printed in the console, instead of the email (since the email wasn't sent).

---

While I set up the local tracking for `127.0.0.1:8080`, I noticed that the website wasn't registering.

It kept showing "Waiting for first pageview on 127.0.0.1"

So, looking through the source, I noticed that in the files `p.js` and `plausible.js`, there was a guard to ignore local tracking:

```js
if (/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname)) return ignore('website is running locally');
```

Commented this line, and my local site is finally set up!

![plausible-127.0.0.1-tracking.png](/assets/images/posts/elixir/plausible-127.0.0.1-tracking.png)

### removing concept of "trial" from the code

In `lib/plausible_web/templates/layout/app.html.eex` you can find the part that shows the remaining trial days.

It's an `eex` file (like `.erb` in Ruby), which stands for Embedded Elixir. Used as templates in Elixir for short. [More info here.](https://elixirschool.com/en/lessons/specifics/eex/).

```elixir
<%= if @conn.assigns[:current_user].subscription == nil do %>
  <li class="mr-6 hidden sm:block">
    <%= link(trial_notificaton(@conn.assigns[:current_user]), to: "/settings") %>
  </li>
<% else %>
  <li class="mr-6 hidden sm:block">
    <%= link("Give feedback", to: "/feedback") %>
  </li>
<% end %>
```

So, a user has a subscription. I want this subscription to be valid and "active" forever.

### Faking the `trial_expiry_date`

Looking through the code, `Plausible.Repo`, `Plausible.Auth.User` and `Plausible.Billing.Subscription` seem interesting files to dig deeper into.

Load your user, in an Elixir Interactive Shell `iex`.

Run `iex -S mix`:

```elixir
user = Plausible.Repo.one(Plausible.Auth.User)
# we got the user (there is only one locally..)
```

Importing `Ecto.Changeset` allows you to `change` given properties on an `Ecto` model:

```elixir
import Ecto.Changeset
```

Let's give our lucky user **100 years** of free trial:

This returns an `Ecto` changeset, that we'll later use to update the user model:

```elixir
changeset = Plausible.Repo.one(Plausible.Auth.User) |> change(trial_expiry_date: Timex.today() |> Timex.shift(years: 100))

#Ecto.Changeset<
  action: nil,
  changes: %{trial_expiry_date: ~D[2120-04-25]},
  errors: [],
  data: #Plausible.Auth.User<>,
  valid?: true
>
```

Great. Now update the user through `Plausible.Repo.update!`:

```elixir
Plausible.Repo.update!(changeset)
```

And the result is the following:

```elixir
UPDATE "users" SET "trial_expiry_date" = $1, "updated_at" = $2 WHERE "id" = $3 [~D[2120-04-25], ~N[2020-04-25 14:51:39], 1]
%Plausible.Auth.User{
  __meta__: #Ecto.Schema.Metadata<:loaded, "users">,
  email: "crifei93@gmail.com",
  google_auth: #Ecto.Association.NotLoaded<association :google_auth is not loaded>,
  id: 1,
  inserted_at: ~N[2020-04-25 09:48:16],
  last_seen: ~N[2020-04-25 14:10:00],
  name: "Christian Fei",
  password: nil,
  password_hash: "$2b$12$U1QBbtTh/4JAsCYuHdrCfeg.uMQGZwEbMWlmNWXPryKgdOgJBKosS",
  site_memberships: #Ecto.Association.NotLoaded<association :site_memberships is not loaded>,
  sites: #Ecto.Association.NotLoaded<association :sites is not loaded>,
  subscription: #Ecto.Association.NotLoaded<association :subscription is not loaded>,
  trial_expiry_date: ~D[2120-04-25],
  updated_at: ~N[2020-04-25 14:51:39]
}
```

|  |  |
|--|--:|
| From 30 days of trial | we managed to "extend" it til the year **2120** |
| ![trial-before.png](/assets/images/posts/elixir/trial-before.png) | ![trial-after.png](/assets/images/posts/elixir/trial-after.png) |

Nice.


# 2020/04/26

Trying to run plausible with Docker.

Stumbled upon [bitwalker/alpine-elixir-phoenix](https://github.com/bitwalker/alpine-elixir-phoenix) which seems like a nice (and up to date) docker image for phoenix projects.

### Dockerfile

Added a Dockerfile for plausible and it looks like this:

```dockerfile
FROM bitwalker/alpine-elixir-phoenix:latest

EXPOSE 8000

ADD . .

RUN mix do deps.get, deps.compile

ADD assets/package.json assets/
RUN cd assets && \
    npm install

RUN cd assets/ && \
    npm run deploy && \
    cd - && \
    mix do compile, phx.digest

USER root

ENTRYPOINT ["/opt/app/run.sh"]
```

Where `run.sh` sets up Ecto and starts phoenix:

```bash
#!/bin/sh

cd /opt/app

mix ecto.create
mix ecto.migrate
mix phx.server
```

To stitch everything together, this is the `docker-compose.yml` I came up:

```yml
version: "3"
volumes:
  node_modules:
  build:
services:
  postgres:
    image: postgres:11-alpine
    restart: always
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
  web:
    build: .
    restart: always
    environment:
      - MIX_ENV=docker
      - PORT=8000
    ports:
      - "80:8000"
    depends_on:
      - postgres
```

The application runs in the environment `docker`, which is similar to `dev`, except for the `Plausible.Repo` `hostname`, that is set to `postgres`.

This because the `web` container "knows" only the `postgres` host, that is resolved to the container and lets phoenix connect to postgres in the Docker environment.


## Deployment with docker-compose

Easy peasy. Set up a [Droplet with DigitalOcean, the smallest one for 5$ is well more than fine.](https://m.do.co/c/880e8f681b50).

Followed this guide to a [basic installation of docker and docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04).

Read about how to always restart the docker containers (also at boot) with [`--restart always`](https://docs.docker.com/config/containers/start-containers-automatically/).

Had to change the `BASE_URL` when building the static assets, to point to `plausible.cri.dev`.

Sbam. [plausible.cri.dev](https://plausible.cri.dev/) is running behind Cloudflare with SSL, in a docker containers with docker-compose, in the [smallest DigitalOcean droplet](https://m.do.co/c/880e8f681b50).

PS: don't even try to out smart it and sign up to it, no signup email is sent so you won't be able to access the dashboard.

Additionally, had to add this snippet to this very site:

```html
<script async defer data-domain="cri.dev" src="https://plausible.cri.dev/js/plausible.js"></script>
```



![plausible.cri.dev.png](/assets/images/posts/elixir/plausible.cri.dev.png)

Ah, and then I set my personal user's trial expiration date to 100 years in the future.

I hope that's enough :)

![plausible.cri.dev.trial.png](/assets/images/posts/elixir/plausible.cri.dev.trial.png)

# Next up?

- Probably it's best to disable signups, have to dig deeper in the code (currently no mail is sent, so no new users can sign up)

- Remove the concept of subscription and trial, further investigation needed.

- Set up a Google Client ID and Secret to get search keywords through the google console

- Same for Twitter

Let me know what you think on [twitter @christian_fei](https://twitter.com/christian_fei)

## Update 2020-05-06

A [kind person](https://github.com/eoinobrien/) on GitHub forked the repo [christian-fei/plausible](https://github.com/christian-fei/plausible) and showed me how to do this even better.

Better in the sense:

Instead of signup up a user, and **then** manually modifying its `trial_expiry_date`, he simply changed the code so that by default any new user would have an extended trial!

The diff looks like this for [`lib/plausible/auth/user.ex`](https://github.com/christian-fei/plausible/blob/master/lib/plausible/auth/user.ex#L31):

```elixir
-    |> change(trial_expiry_date: Timex.today() |> Timex.shift(days: 30))
+    |> change(trial_expiry_date: Timex.today() |> Timex.shift(years: 100))
```

Anyways, I had the chance to dabble a bit with **Phoenix** and **Ecto**, so not so bad after all.
