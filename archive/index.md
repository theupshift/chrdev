---
layout: page.njk
title: Posts
---

{% block content %}
<p>
  Below you can skim through the <b>{{ collections.post.length }} articles</b> I wrote over the years.
</p>

<div class="posts searchable">
  <input class="searchable-input" type="text"/>
{% for post in collections.post | reverse %}
  <div class="searchable-item">
    <a href="{{ post.url }}" class="ellipsis">
      <div class="">
        <time datetime="{{ post.data.date | isoday }}" class="post-date">{{ post.data.date | isoday }}</time>
        <span class="post-link">{{ post.data.title }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>
{% endblock %}
