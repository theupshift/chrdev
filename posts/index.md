---
layout: layout.njk
---

<h1 class="no-anchorify">posts</h1>

Browse by tag [#general](/tags/general), [#js](/tags/js), [#tut](/tags/tut), [#angularjs](/tags/angularjs), [#crypto](/tags/crypto)

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
