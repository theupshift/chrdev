---
title: Send a Telegram message with Darklang
date: 2020-03-04
layout: post.njk
tags:
  - post
  - darklang
---

In this example you can see how to emit a *Worker* event with Darklang.

The worker is named `send_telegram_message` and looks like this:

```haskell
let channel = "YOUR_CHANNEL_ID"
let botToken = "YOUR_BOT_TOKEN"
let url = "https://api.telegram.org/bot" ++ botToken ++ "/sendMessage"
let query = {
              chat_id : channel
              text : event.text
              parse_mode : "HTML"
            }
let url = url
HttpClient::getv4 url query {}
```

The worker is then called with and *event body*, which should contain *the text to send via Telegram*:

```haskell
let event = {
              text: "Hello from Darklang"
            }
let _ emit event "send_telegram_message"
```

This is how the worker looks like:

![dark telegram](/assets/images/posts/dark/dark-telegram.png)
