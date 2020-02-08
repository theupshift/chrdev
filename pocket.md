---
layout: layout.njk
title: Pocket reading list
---

<p>
  <strong>My Pocket reading list</strong>
</p>

<p>
  <i>last updated</i>&nbsp;<date>{{ pocket.lastSynced }}</date>
</p>

<p>
  use <code>ctrl + f</code> for searching through items
</p>

<ol reversed class="searchable1">
{% for post in pocket.items %}
  <li class="post-item">
    <span class="post-date">{{ post.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ol>
