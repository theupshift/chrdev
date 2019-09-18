---
layout: layout.njk
---

<ul class="searchable">
{% for post in collections.posts %}
  <li class="post-item">
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ul>
