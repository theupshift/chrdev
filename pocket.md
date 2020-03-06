---
layout: layout.njk
title: Pocket reading list
pagination:
  data: pocket.items
  size: 100
  alias: pocket_items
---

<p>
  <strong>My Pocket reading list</strong>
</p>

<p>
  <i>last updated</i>&nbsp;<date>{{ pocket.lastSynced }}</date>
</p>

<ol reversed class="searchable1">
{% for pocket_item in pocket_items %}
  <li class="post-item">
    <time datetime="{{ pocket_item.data.date | date: '%Y-%m-%d' }}" class="post-date">{{ pocket_item.data.date | date: '%Y-%m-%d' }}</time>
    <a href="{{ pocket_item.url }}" class="post-link">
      {{ pocket_item.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ol>
