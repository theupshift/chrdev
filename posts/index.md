---
layout: page.njk
title: Posts
---

{% block content %}
<ol reversed class="searchable">
{% for post in collections.post | reverse %}
  <li class="post-item">
    <time datetime="{{ post.date | printdate }}" class="post-date">{{ post.date | printdate }}</time><a href="{{ post.url }}" class="post-link">{{ post.title | capitalize }}</a>
  </li>
{% endfor %}
</ol>
{% endblock %}