---
layout: page.njk
title: Pocket reading list
---

{% block content %}

<p>
  <strong>My Pocket reading list</strong>
</p>

<ol reversed class="searchable1">
{% for pocket_item in collections.pocketItems %}
  <li class="post-item1">
    <time datetime="{{ pocket_item.data.date | isoday }}" class="post-date">{{ pocket_item.date | isoday }}</time>
    <a href="{{ pocket_item.url }}" class="post-link">
      {{ pocket_item.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ol>


{% endblock %}
