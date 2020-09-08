---
layout: page.njk
title: Posts
---

{% block content %}

<b><a href="/archive/" class="cta">Visit the archive</a> to see all {{ collections.post.length }} posts</b>

<p>
  Below you can skim through <b>featured articles</b> I wrote over the years.
</p>
<p>
  To see all {{collections.post.length}} articles, head over to the <a href="/archive">archive</a>
</p>
<p>
  Elixir, node.js, crypto, testing, tutorials, thoughts and more.
</p>

{% include 'subscribe-to-newsletter.html' %}

<div class="posts">
{% for post in collections.featured | reverse | limit5 %}
  <article class="mb">
    <h1 class="title"><a href="{{ post.url }}">{{ post.data.title }}</a></h1>
    <div class="main-content">{{ post.excerpt | safe }}</div>
  </article>
{% endfor %}
</div>

<p class="alert-warning mt">
  Skim through all posts on <a href="/archive">/archive</a>
</p>
{% endblock %}
