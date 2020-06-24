---
layout: page.njk
title: Home
---

{% block content %}
<div class="pure-g">
  <div class="pure-u-1 pure-u-md-2-3">
    <h1 class="no-anchor"><b>Welcome to my blog!</b> 👋</h1>
    <p>My name is Christian, <b>cri</b> for short</p>
    <p>A <b>passionate web developer</b> from <b>Italy</b></p>
    <p>Into Agile Software development, connoisseur of clean code and testing aficionado<p>
    <p>Blogging quite frequently 👉 <a class="cta" href="/subscribe/">subscribe to my newsletter</a></p>
    <p>You can read some <a href="/posts">featured blog posts</a>, <a href="/books">recommended books</a> and skim through <a href="/archive">the archive</a></p>
  </div>
  <div class="pure-u-1 pure-u-md-1-3">
    <div class="cf">
      <a href="/about" class="no-underline">
        <img class="avatar-image no-shadow" alt="me with sunglasses" src="/assets/images/cf4.png"/>
      </a>
      <p>
        <a href="/about">about me</a> | <a href="https://twitter.com/christian_fei" target="_blank"><i class="icon icon-twitter"></i></a> | <a href="https://github.com/christian-fei" target="_blank"><i class="icon icon-github"></i></a>
      </p>
    </div>
  </div>
</div>
<div>
  <p>
    <b>Support me</b> through my <a href="https://github.com/sponsors/christian-fei">GitHub Sponsor page ✌️</a>
  </p>
  <p>
    See a <b>data visualization</b> of my <a href="/contributions">GitHub contributions 📈</a> over the years
  </p>
  {% include 'subscribe-to-newsletter.html' %}
</div>
{% endblock %}
