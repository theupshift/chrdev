---
layout: page.njk
title: Recommended books
---

{% block content %}

Here you can find *some* of my <b>recommended books</b> for a <i>solid culture for developers</i>.

---

<b>My name is Christian</b> and I'm a <a href="https://www.linkedin.com/in/christian-fei-6b72b5123/" target="_blank">passionate web developer</a> from <b>Italy</b>

You can <a href="https://twitter.com/christian_fei" target="_blank">
<i class="icon icon-twitter"></i>&nbsp; follow me on twitter</a> and read a bit more <a href="/about">about me</a>.

<h1 class="">Recommended books</h1>

<div reversed class="flex">
  {% for book in collections.books %}
    <a href="{{ book.url }}" class="book">
      {{ book.title }}
    </a>
  {% endfor %}
</div>

<style>
.amazon-book-preview { max-width: 120px; }
.book { min-width: 200px; height: 200px; }
.book:nth-child(1) { background: azure; }
.book:nth-child(2) { background: papayawhip; }
.book:nth-child(3) { background: aliceblue; }
.book:nth-child(4) { background: blanchedalmond; }
.book:nth-child(5) { background: cornsilk; }
.book:nth-child(6) { background: thistle; }
.book:nth-child(7) { background: lavender; }
.book:nth-child(8) { background: mintcream; }
.book:nth-child(9) { background: snow; }
</style>

{% endblock %}