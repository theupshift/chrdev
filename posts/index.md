---
layout: page.njk
title: Posts
---

{% block content %}
<ol reversed class="searchable">
{% for post in collections.post | reverse %}
  <li class="post-item">
    <time datetime="{{ post.data.date | isoday }}" class="post-date">{{ post.data.date | isoday }}</time>
    <a href="{{ post.url }}" class="post-link">{{ post.data.title | capitalize }}</a>
  </li>
{% endfor %}
</ol>
{% endblock %}