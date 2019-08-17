---
layout: layout.njk
---

<h1>posts</h1>

<ul>
{% for post in collections.posts %}
  <li><a href="{{ post.url }}">{{ post.data.date | date: '%Y-%m-%d' }} {{ post.data.title }}</a></li>
{% endfor %}
</ul>
