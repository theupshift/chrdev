---
title: Minimal environments with dotenv and Node.js
date: 2020-02-08
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - nodejs
  - tutorial
image: https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Personally I use `dotenv` to handle different environments in my Node.js applications.

It gives you the ability to specify a `.env` file (generally provisioned on each environment with the corresponding environment variables), along these lines:

`.env`

```bash
BASE_URL=http://localhost:1234
MONGO_URL=mongodb://localhost:27017/test
NODE_ENV=development
LEVEL=info
```

Install `dotenv` with `npm i dotenv`

---

## but..

I want to be able to have multiple `.env` files (e.g. `.env.production`, `.env.staging`, `.env.test`) and switch between different environment.

Idiomatically in Node.js we use `NODE_ENV`.

So by setting just the environment variable `NODE_ENV` when running a Node.js program, `env.js` will load the environment variable of the corresponding environment.

This is how [`lib/env.js`](https://github.com/christian-fei/pomodoro.cc/blob/master/api/env.js) looks like:

```js
const path = require('path')
const envFileName = `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`
const pathToEnvFile = path.resolve(__dirname, envFileName)
require('dotenv').config({ path: pathToEnvFile })
```

it is then used simply by `require`'ing it with `require('./env')`:

```js
require('./env')
console.log('process.env.MONGO_URL', process.env.MONGO_URL)
```

Here's an example of how it's used in [pomodoro.cc](https://pomodoro.cc) [source code](https://github.com/christian-fei/pomodoro.cc/blob/master/api/scripts/update-users-twitter-avatar.js#L3).

You need to call this just once in your main js file and you're good to go.

E.g. to run any script with a given environment:

```bash
env NODE_ENV=production npm run migrate -- status
env NODE_ENV=development npm run migrate -- status

env NODE_ENV=production npm run migrate -- up
env NODE_ENV=development npm run migrate -- up
```

Given you have a `.env.production` and `.env.development` file set up.
