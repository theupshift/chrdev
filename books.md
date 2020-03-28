---
layout: page.njk
title: Recommended books
---

{% block content %}

Here you can find *some* of my <b>recommended books</b> for a <i>solid culture for developers</i>.

---

<b>My name is Christian</b> and I'm a <a href="https://www.linkedin.com/in/christian-fei-6b72b5123/" target="_blank">passionate web developer</a> from <b>Italy</b>

You can <a href="https://twitter.com/christian_fei" target="_blank">
{% include 'img/twitter.html' %} follow me on twitter</a> and read a bit more <a href="/about">about me</a>.

<h1 class="no-mt">Recommended books</h1>

<div reversed class="flex flex-wrap">
  {% for book in collections.books %}
    <a href="{{ book.url }}" class="post-link flex-item pad-half book">
      {{ book.title }}
    </a>
  {% endfor %}
</div>

{% endblock %}