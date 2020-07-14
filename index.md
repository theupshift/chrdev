---
layout: page.njk
title: Home
---

{% block content %}
<div class="flex">
  <div class="">
    <h1 class="no-anchor no-mt"><b>Hi!</b> 👋</h1>
    <p>My name is Christian, <b>cri</b> for short</p>
    <p>A <b>passionate web developer</b> from <b>Italy</b></p>
    <p>Blogging quite frequently 👉 <a class="cta" href="/subscribe/" class="track-home-subscribe-newsletter">subscribe to my newsletter</a></p>
    <p><a href="/learn-testing-nodejs-javascript/" class="track-home-learn-testing-nodejs-javascript">🚀&nbsp;Learn Testing with Node.js & JavaScript</a></p>
    <!--
    <p>Read my <a href="/posts" class="track-home-featured-posts">featured blog posts</a>, <a href="/books" class="track-home-books">recommended books</a> and skim through <a href="/archive" class="track-home-archive">the archive</a></p>
    -->
  </div>
  <div class="">
    <div class="cf">
      <a href="/about" class="no-underline track-home-about-image">
        <img class="avatar-image no-shadow" alt="me with sunglasses" src="/assets/images/cf4.webp"/>
      </a>
      <p>
        <a href="/about" class="track-home-about-link">about me</a> | <a href="https://twitter.com/christian_fei" target="_blank" class="track-home-twitter-link"><i class="icon icon-twitter"></i></a> | <a href="https://github.com/christian-fei" target="_blank" class="track-home-github-link"><i class="icon icon-github"></i></a>
      </p>
    </div>
  </div>
</div>
<!--
<div>
  <p>
    <b>Support me</b> through my <a href="https://github.com/sponsors/christian-fei" class="track-home-github-sponsors">GitHub Sponsors page ✌️</a>
  </p>
  <p>
    See a <b>data visualization</b> of my <a href="/contributions" class="track-home-github-contributions">GitHub contributions 📈</a> over the years
  </p>
</div>
-->
<div>
  {% include 'subscribe-to-newsletter-slim.html' %}
</div>
{% endblock %}
