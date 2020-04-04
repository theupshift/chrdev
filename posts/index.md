---
layout: page.njk
title: Posts
---

{% block content %}

<div class="alert">
  <p>
    Below you can skim through <b>articles</b> I wrote over the years.
  </p>
  <p>
    node.js, crypto, testing, tutorials, thoughts and more.
  </p>
</div>

<b><a href="/archive/">Visit the archive</a> to see all {{collections.post.length}} posts</b>

<div class="posts flex flex-wrap">
{% for post in collections.featured | reverse | limit10 %}
  <article class="preview">
    <h1 class="title"><span><a href="{{ post.url }}">{{ post.data.title }}</a></span></h1>
    <div>{{post.htmlContent | safe}}</div>
  </article>
{% endfor %}
</div>
{% endblock %}
