---
title: Send a Telegram message with Darklang
date: 2020-03-04
layout: post.njk
tags:
  - post
  - darklang
  - featured
image: https://images.unsplash.com/photo-1521931961826-fe48677230a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

In this example you can see how to emit a *Worker* event with Darklang.

### Telegram endpoint `/sendMessage`

Using the endpoint [`messages.sendMessage`](https://core.telegram.org/method/messages.sendMessage) you can simply send a message on Telegram by calling this endpoint via GET and the needed parameters in the query string.

## The worker

The worker is named `send_telegram_message` and looks like this:

```haskell
let chat_id = "YOUR_CHAT_ID"
let bot_token = "YOUR_BOT_TOKEN"
let url = "https://api.telegram.org/bot" ++ bot_token ++ "/sendMessage"
let query = {
              chat_id : chat_id
              text : event.text
              parse_mode : "HTML"
            }
HttpClient::getv4 url query {}
```

## Calling the worker

The worker is then called with and *event body*, which should contain *the text to send via Telegram*:

```haskell
let event = {
              text: "Hello from Darklang"
            }
let _ emit event "send_telegram_message"
```

This is how the worker looks like:

![dark telegram](/assets/images/posts/dark/dark-telegram.png)
