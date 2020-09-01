---
layout: page.njk
title: Posts
---

{% block content %}
<div class="alert">
  <p>
    Below you can skim through the <b>{{ collections.post.length }} articles</b> I wrote over the years.
  </p>
</div>

<div class="posts searchable">
{% for post in collections.post | reverse %}
  <div class="searchable-item">
    <a href="{{ post.url }}" class=" featured-post">
      <div class="l-box">
        <time datetime="{{ post.data.date | isoday }}" class="post-date bg-white">{{ post.data.date | isoday }}</time>
        <span class="post-link bg-white">{{ post.data.title | capitalize }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>
{% endblock %}
