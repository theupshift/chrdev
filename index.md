---
layout: layout.njk
---

<h2>about</h2>

i am an [agile enthusiast](https://en.wikipedia.org/wiki/agile_software_development), [clean code connoisseur](https://blog.cleancoder.com) & [testing aficionado](https://en.wikipedia.org/wiki/test-driven_development)

read more <a href="/about">about</a> me
<h1 class="title no-anchorify">posts</h1>

<p class="no-share">
  Browse by tag <a class="tag" href="/tags/featured">#featured</a> <a class="tag" href="/tags/general">#general</a> <a class="tag" href="/tags/js">#js</a> <a class="tag" href="/tags/tutorial">#tutorial</a> <a class="tag" href="/tags/angularjs">#angularjs</a> <a class="tag" href="/tags/crypto">#crypto</a>
</p>

Featured posts

<ul reversed class="searchable">
{% for post in collections.featured %}
  <li class="post-item">
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ul>

and the last 10 <a href="/posts">posts</a>

<ul reversed class="searchable">
{% for post in collections.last10posts %}
  <li class="post-item">
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    <a href="{{ post.url }}" class="post-link">
      {{ post.data.title | capitalize }}
    </a>
  </li>
{% endfor %}
</ul>

or <a href="/posts/">all {{ collections.posts.length }} of them</a>
