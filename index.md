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
      <a href="/about" class="no-underline track-home-about-image">
        <picture>
          <source srcset="/assets/images/cf4.webp" type="image/webp">
          <img class="avatar-image no-shadow" src="/assets/images/cf4.png" alt="me with sunglasses">
        </picture>
      </a>
      <p>
        <a href="https://twitter.com/christian_fei" target="_blank" rel="noopener" class="track-home-twitter-link" aria-hidden="true" tabindex="-1"><i class="icon icon-twitter"></i></a> | <a href="https://github.com/christian-fei" target="_blank" class="track-home-github-link" aria-hidden="true" tabindex="-1"><i class="icon icon-github"></i></a>
      </p>
    </div>
  </div>
</div>

{% include 'stay-in-touch.html' %}

<div>
  <h2 class="no-anchor mt">Featured blog posts</h2>
  {% include "featured.html" %}
</div>

<h2 class="no-anchor mt">Blog posts</h2>

<p>
  Below you can skim through the <b>{{ collections.post.length }} articles</b> I wrote over the years.
  <br>
  <a href="/archive/">Browse through all posts</a>
</p>

<div class="posts">
{% for post in collections.post | reverse| limit20 %}
  <div>
    <a href="{{ post.url }}" class="post ellipsis">
      <div class="">
        <time datetime="{{ post.data.date | isoday }}" class="post-date">{{ post.data.date | isoday }}</time>
        <span class="post-link">{{ post.data.title }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<br>

{% include 'stay-in-touch.html' %}


{% endblock %}
