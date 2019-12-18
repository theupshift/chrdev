---
layout: layout.njk
---

<h1 class="title no-anchorify">posts</h1>

<p>
  Browse by tag <a class="tag" href="/tags/featured">#featured</a>, <a class="tag" href="/tags/general">#general</a>, <a class="tag" href="/tags/js">#js</a>, <a class="tag" href="/tags/tutorial">#tutorial</a>, <a class="tag" href="/tags/angularjs">#angularjs</a>, <a class="tag" href="/tags/crypto">#crypto</a>
</p>

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
