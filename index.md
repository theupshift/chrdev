---
layout: page.njk
title: Home
---

{% block content %}
<h1><b>Welcome to my blog!</b> 👋</h1>

<b>My name is Christian</b> and I'm a <a href="https://www.linkedin.com/in/christian-fei-6b72b5123/" target="_blank">passionate web developer</a> from <b>Italy</b>

You can <a href="https://twitter.com/christian_fei" target="_blank">
{% include 'img/twitter.html' %} follow me on twitter</a> and read a bit more <a href="/about">about me</a>

Reed some of my <a href="/posts">blog posts 📝</a> and <a href="/books">recommended books 📖</a>

{% include 'subscribe-to-newsletter.html' %}


<div class="cf">
  <a href="/about">
    <img class="avatar-image" style="border-radius: 50%;" src="/assets/images/cf4.png"/><br/>about me
  </a>
</div>

You can **support me** through my [GitHub Sponsor page ✌️](https://github.com/sponsors/christian-fei)

See a **data visualization** of my [GitHub contributions 📈](/contributions) over the years

{% endblock %}
