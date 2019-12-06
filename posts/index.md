---
layout: layout.njk
---

<h1 class="title no-anchorify">posts</h1>

Browse by tag <a href="/tags/general">#general</a>, <a href="/tags/js">#js</a>, <a href="/tags/tut">#tut</a>, <a href="/tags/angularjs">#angularjs</a>, <a href="/tags/crypto">#crypto</a>

<ol reversed class="searchable">
{% for post in collections.posts %}
  <li class="post-item">
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ol>
