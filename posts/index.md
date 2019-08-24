---
layout: layout.njk
---

<h1>posts</h1>

<ul>
{% for post in collections.posts %}
  <li class="post-item">
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title }}
    </a>
  </li>
{% endfor %}
</ul>
