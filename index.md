---
layout: page.njk
title: Home
---

{% block content %}
<div class="flex flex-wrap">
<div class="flex-item" style="max-width: 21em;">
  <div class="no-mobile" style="margin-top: 3em; width: 25em"></div>
  <h1><b>Welcome to my blog!</b> 👋</h1>

  <b>My name is Christian</b>
  <br/>
  A <a href="https://www.linkedin.com/in/christian-fei-6b72b5123/" target="_blank">passionate web developer</a> from <b>Italy</b>

  Read more <a href="/about">about me</a>
  <br/>
  <a href="https://twitter.com/christian_fei" target="_blank">{% include 'img/twitter.html' %} @christian_fei</a>

  Featured <a href="/posts">blog posts</a>, <a href="/books">recommended books</a> and <a href="/archive">the archive</a>

</div>

<div class="flex-item">
  <div class="cf">
    <a href="/about">
      <img class="avatar-image" style="border-radius: 50%;" src="/assets/images/cf4.png"/>
    </a>
  </div>
</div>
</div>

</br>

<div>
{% include 'subscribe-to-newsletter.html' %}

<p>
You can <b>support me</b> through my <a href="https://github.com/sponsors/christian-fei">GitHub Sponsor page ✌️</a>

See a <b>data visualization</b> of my <a href="/contributions">GitHub contributions 📈</a> over the years
</p>
</div>
{% endblock %}
