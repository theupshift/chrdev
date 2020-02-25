---
title: Simple .npmrc management
date: 2020-02-25
layout: post.njk
tags:
  - post
  # - featured
  - nodejs
  - javascript
---

One way to provide environment variables when running a script with npm, is to create a file called `.npmrc` in the root of the project (same level as `package.json`).

Here is an example `.npmrc` (*note: lowercase*):

```yaml
telegram_token=abc
telegram_chat_id=123
```

I find it useful to have an **npm script** called `node`, which runs node, but by loading the `.npmrc` file:

In your package.json
```json
  "scripts": {
    "node": "node",
    ...
```

Then, in your Node.js script, you would read the environment variables with the `npm_config_` prefix.

You can run this now with `npm run node -- index.js`

The `index.js` file:

```js
console.log(process.env.npm_config_telegram_token)
> abc
console.log(process.env.npm_config_telegram_chat_id)
> 123
```

Here is how I personally [manage my environments in Node.js](/posts/2020-02-08-Minimal-environments-with-dotenv-and-Node.js/).

# Example

Below you can find an example using the library `simple-telegram-message`:

```js
const { sendMessageFor } = require('simple-telegram-message')
const sendMessage = sendMessageFor(process.env.npm_config_telegram_token, process.env.npm_config_telegram_chat_id)
sendMessage(`Hi from bot!`)
```