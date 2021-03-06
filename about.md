---
layout: page.njk
title: About
---

{% block content %}
<div class="cf">
  <a href="https://twitter.com/christian_fei" class="no-underline track-about-image-twitter">
    <picture>
      <source srcset="/assets/images/cf4.webp" type="image/webp">
      <img class="avatar-image no-shadow" src="/assets/images/cf4.png" alt="me with sunglasses">
    </picture>
    <br>@christian_fei
  </a>
</div>

<h5 class="no-anchor">I am an agile enthusiast, clean code connoisseur & testing aficionado</h5>

Italian, german & english speaking.

Reach out on [twitter @christian_fei](https://twitter.com/christian_fei)

Email me at hey [at] cri.dev

> Simplicity is the ultimate sophistication ~ I want to think Leonardo Da Vinci said that.


# Work history

Previously Agile Developer at XPeppers, Trento (2014 - 2017).

Worked with Node.js, JavaScript, Python, MongoDB, Redis, Cloud, Stats, DevOps, Automation, Scraping as a Full Stack Developer at [wonderflow](https://www.wonderflow.co), Trento (2017 - 2020).

Quit my job in summer 2020 to enjoy my time for 6 months or so.

I'm currently on "vacation"


# Writing code as a passion

Clean Code, TDD, Refactoring and SOLID Principles are my special weapons to tame codebases.

Most of my OSS can be found on my [github profile](https://github.com/christian-fei).

I try to stay up to date with what people are coming up with, thus I read a lot, here you can find [my full pocket reading history](/pocket/) and [recommended books](/books/)

See a **data visualization** of my [GitHub contributions 📈](/contributions) over the years

{% include 'stay-in-touch.html' %}

## OSS Projects

Coding in all kinds of tech fields that bring value to me, read IoT, Crypto, Bots, Apps, CLI utilities, Automation of all kinds.

My most recent project is [mega-scraper](https://github.com/christian-fei/mega-scraper): it aims to be a simple website scraping tool with proxy support, request blocking and various optimizations.

In April 2020 I made a fast static site generator and called it [`devblog`](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/)

In the field of IoT I made a [watering system](https://github.com/christian-fei/garden) with a **raspberry pi, camera, temperature and moisture sensors**. the communication is handled via **telegram**. with the help of a bot I can water, request a snapshot or video of the garden and a timelapse of the past days. most importantly this enables me to water my plants remotely and seeing their current state through an image sent on a private telegram channel.

Right now I am probably **writing code** for
- [mega-scraper](https://github.com/christian-fei/mega-scraper) - scrape a website's content with puppeteer
- [devblog](https://github.com/christian-fei/devblog) - fast static site generator
- [this very blog](https://github.com/christian-fei/christian-fei.github.io) - built with [devblog](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/)
- [simple-jekyll-search](https://github.com/christian-fei/simple-jekyll-search) - search for your jekyll blog
- [jenkins-stream-build](https://github.com/christian-fei/jenkins-stream-build) - stream jenkins build logs in realtime
- [simple-telegram-message](https://github.com/christian-fei/simple-telegram-message) - send a telegram message in one line
- [pocket-sync](https://github.com/christian-fei/pocket-sync) - sync pocket items to json
- [coinmarketcap-scraper](https://github.com/christian-fei/coinmarketcap-scraper) - CLI for crypto historic values
- [trello-recap](https://github.com/christian-fei/trello-recap) - recap of your trello activity
- [justchart](https://github.com/christian-fei/justchart) - display any json as a chart
- [open-weather-map-cli](https://github.com/christian-fei/open-weather-map-cli) - CLI for weather

You can **support me** on [GitHub Sponsors](https://github.com/sponsors/christian-fei)

---

Regarding crypto, I launched [cryptosheet.cc](https://cryptosheet.cc/) in the summer of 2018 to satisfy my need to have all my balances and transactions on different crypto exchanges and wallet providers, in one single place: namely a spreadsheet.

[cryptosheet.cc](https://cryptosheet.cc/) was a web application that wrote all your transactions and account details on a google spreadsheet. Supported exchanges were Coinbase, Coinbase Pro (formerly GDAX), Binance, Gatehub Wallet, IOTA Token, Ripple Wallet.

---

I made pomodoro.cc in 2014. it **was** a clean timer to help you to keep your focus.

I had to shut it down because of a [trademark issue](/posts/2020-02-13-So-Long-and-Thanks-for-All-the-Veggies/).


## Polyglot programmer

*probably* wrote at least some **JavaScript** every day over the past six years

Depending on the weather outside, I refresh my little but solid **Elixir** skills

When I feel really bad, I console myself with some **Haskell** (completed the course [FP101 at UNI Delft](https://www.edx.org/course/introduction-functional-programming-delftx-fp101x-0))

Had a chance to dabble with **Python** in the context of python notebooks when I was doing my first steps understanding what ML is

When I was doing **Ruby** I felt on top of the world

As a classic, **Java**, but I prefer to stay away from it

{% include 'stay-in-touch.html' %}

{% endblock %}

