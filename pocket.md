---
layout: page.njk
title: Pocket reading list
---

{% block content %}

<p>
  <strong>My Pocket reading list</strong>
</p>

<ul reversed class="">
{% for item in collections.pocketItems %}
  <li class="">
    <time datetime="{{ item.date | isoday }}" class="post-date">{{ item.date | isoday }}</time>
    <a href="{{ item.url }}" class="post-link">
      {{ item.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ul>


{% endblock %}
