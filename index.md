---
layout: page.njk
title: Home
---

{% block content %}
<div class="flex">
  <div class="half">
    <h1 class="no-anchor no-mt"><b>Hi!</b> 👋</h1>
    <p>My name is Christian, <b>cri</b> for short</p>
    <p>A <b>passionate web developer</b> from <b>Italy</b></p>
  </div>

  <div class="half">
    <div class="cf">
      <a href="/about" class="no-underline track-home-about-image" aria-hidden>
        <img class="avatar-image no-shadow" alt="me with sunglasses" src="/assets/images/cf4.png"/>
      </a>
      <p>
        <a href="/about" class="track-home-about-link">about me</a> | <a href="https://twitter.com/christian_fei" target="_blank" class="track-home-twitter-link" aria-hidden><i class="icon icon-twitter"></i></a> | <a href="https://github.com/christian-fei" target="_blank" class="track-home-github-link" aria-hidden><i class="icon icon-github"></i></a>
      </p>
    </div>
  </div>
</div>

<div>
  <p><a href="/learn-testing-nodejs-javascript/" class="track-home-learn-testing-nodejs-javascript">✅&nbsp;Learn Testing with Node.js & JavaScript</a></p>
  <p><a href="https://gumroad.com/l/yUhsLz" class="track-home-gumroad-techniques-seo">🚀&nbsp;Get a copy of "Techniques to improve SEO"</a></p>
  <p><a href="/subscribe/" class="track-home-subscribe-newsletter"> 👉&nbsp;Subscribe to my newsletter</a></p>
</div>

<div class="mt5">
  {% include 'subscribe-to-newsletter-slim.html' %}
</div>
{% endblock %}
