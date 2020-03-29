---
layout: page.njk
title: Posts
---

{% block content %}

Below you can skim through articles I wrote over the years.

node.js, crypto, testing, tutorials, thoughts and more.

<div class="posts flex flex-wrap searchable">
{% for post in collections.post | reverse %}
  <a href="{{ post.url }}" class="post-item flex-item" {% if post.data.image %}lazy="{{post.data.image}}"{% endif %}>
    <time datetime="{{ post.data.date | isoday }}" class="post-date bg-white">{{ post.data.date | isoday }}</time>
    <span class="post-link bg-white">{{ post.data.title | capitalize }}</span>
    <p class="excerpt">
      <small class="bg-white">{{ post.md | safe | striptags | excerpt }}</small>
    </p>
  </a>
{% endfor %}
</div>
{% endblock %}