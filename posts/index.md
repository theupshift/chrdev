---
layout: layout.njk
title: Posts
---

<ol reversed class="searchable">
{% for post in collections.posts %}
  <li class="post-item">
    <time datetime="{{ post.data.date | date: '%Y-%m-%d' }}" class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</time>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ol>
