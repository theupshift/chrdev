---
layout: page.njk
title: Posts
---

{% block content %}
<p>
  Below you can skim through the <b>{{ collections.post.length }} articles</b> I wrote over the years.
</p>

<div class="posts searchable">
{% for post in collections.post | reverse %}
  <div class="searchable-item">
    <a href="{{ post.url }}" class="">
      <div class="">
        <time datetime="{{ post.data.date | isoday }}" class="post-date">{{ post.data.date | isoday }}</time>
        <span class="post-link">{{ post.data.title | capitalize }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>
{% endblock %}
