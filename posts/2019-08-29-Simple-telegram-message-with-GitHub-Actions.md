---
title: Simple telegram message with GitHub Actions
date: 2019-08-29
layout: post.njk
tags:
  - post
  - javascript
  - featured
  - tutorial
image: https://images.unsplash.com/photo-1521931961826-fe48677230a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Let's get straight to the point.

After reading this, you'll be able to send a telegram message to a `chat_id` with one command.

## secrets

set the following secrets in the settings of your repository where you want to run the workflow:

### TELEGRAM_TOKEN

you'll get this token from the `BotFather`, just issue the `/newbot` command.

### TELEGRAM_CHANNEL

this is the receivers `chat_id`, you can find out yours with [@userinfobot](https://web.telegram.org/#/im?p=@userinfobot).

## github actions workflow

this is what is looks like. we're going to use a small npm package `simple-telegram-message`

```yml
name: telegram message example
on: [push]
jobs:
  build_deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@master
      - name: install
        run: |
          npm install
      - name: send-telegram-message
        env:
          TELEGRAM_TOKEN: {% raw %}${{ secrets.TELEGRAM_TOKEN }}{% endraw %}
          TELEGRAM_CHANNEL: {% raw %}${{ secrets.TELEGRAM_CHANNEL }}{% endraw %}
          TELEGRAM_TEXT: "Deployed to https://christianfei.com"
        run: |
          npx simple-telegram-message@latest
```

## et voilà

![github-actions-tg-bot.png](/assets/images/posts/github-actions-tg-bot.png)
