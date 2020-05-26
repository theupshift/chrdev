---
title: "Upgrading MongoDB 3.6 to 4.2 with brew"
date: 2020-05-26
layout: post.njk
tags:
  - post
  - mongodb
  - tutorial
---

As cited on the [official release notes](https://docs.mongodb.com/manual/release-notes/4.2-upgrade-standalone/):

> To upgrade an existing MongoDB deployment to 4.2, you must be running a 4.0-series release.

So, a little bit of context:

Let's say you are currently running on version 3.6.

You want to upgrade to the latest version.

You would be inclined to directly upgrade from 3.6 to 4.2.

Not so fast.

## Upgrading from mongodb to mongodb-community@4.0

Uninstall the current mongodb installation

```sh
brew uninstall mongodb
```

Tap the updated brew, just in case:

```sh
brew tap mongodb/brew
```

Install the 4.0 version:

```sh
brew install mongodb-community@4.0
```

`brew services` should now list `mongodb-community` as a running service.

```sh
Name              Status  User      Plist
mongodb-community started christian /Users/christian/Library/LaunchAgents/homebrew.mxcl.mongodb-community.plist
```

# Uninstall 4.0 and install 4.2

```sh
brew uninstall mongodb-community@4.0
brew install mongodb-community@4.2
```

Again, `brew services` should list the running `mongodb-community` service.

# Fix broken / lost executables

If you're missing the `mongo` executable, fix it by symlinking it via brew:

```sh
brew link mongodb-community@4.2 --force
```

Tada.
