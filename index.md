---
layout: page.njk
title: Home
---

{% block content %}
<div class="flex">
  <div class="half">
    <h1 class="no-anchor "><b>Hi!</b> 👋</h1>
    <p>My name is Christian, <b>cri</b> for short</p>
    <p>A <b>passionate web developer</b> from <b>Italy</b></p>
  </div>

  <div class="half">
    <div class="cf">
      <a href="/about" class="no-underline track-home-about-image" aria-hidden tabindex="-1">
        <picture>
          <source srcset="/assets/images/cf4.webp" type="image/webp">
          <img class="avatar-image no-shadow" src="/assets/images/cf4.png" alt="me with sunglasses">
        </picture>
      </a>
      <p>
        <a href="https://twitter.com/christian_fei" target="_blank" class="track-home-twitter-link" aria-hidden tabindex="-1"><i class="icon icon-twitter"></i></a> | <a href="https://github.com/christian-fei" target="_blank" class="track-home-github-link" aria-hidden tabindex="-1"><i class="icon icon-github"></i></a>
      </p>
    </div>
  </div>
</div>

<div>
  <p><a href="/learn-testing-nodejs-javascript/" class="track-home-learn-testing-nodejs-javascript">Learn Testing with Node.js & JavaScript</a>&nbsp;&nbsp;<small>Book + Videos</small></span></p>
  <p><a href="https://gumroad.com/l/yUhsLz" class="track-home-gumroad-techniques-seo">Get a copy of "Techniques to improve SEO"</a>&nbsp;&nbsp;<small>Book</small></p>
</div>

<div class="">
  <a href="/subscribe/" class="track-home-subscribe-newsletter">Get updates from me in your inbox</a>
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
    class="embeddable-buttondown-form-slim">
      <input type="email" name="email" id="bd-email" placeholder="elon@tesla.com">
      <input type="hidden" value="1" name="embed"></input>
      <button type="submit">Subscribe</Button>
  </form>
</div>

<br>

<div class="alert">
  <p>
    Below you can skim through the <b>{{ collections.post.length }} articles</b> I wrote over the years.
  </p>
</div>

<div class="posts searchable">
{% for post in collections.post | reverse %}
  <div class="searchable-item">
    <a href="{{ post.url }}" class=" featured-post">
      <div class="l-box">
        <time datetime="{{ post.data.date | isoday }}" class="post-date bg-white">{{ post.data.date | isoday }}</time>
        <span class="post-link bg-white">{{ post.data.title | capitalize }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>

{% endblock %}
