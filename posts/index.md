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

<div class="posts">
{% for post in collections.featured | reverse | limit5 %}
  <article class="">
    <h1 class="title"><a href="{{ post.url }}">{{ post.data.title }}</a></h1>
    <header>
      <p class="no-mobile">
        <a target="_blank" rel="noreferrer" href="https://github.com/christian-fei/christian-fei.github.io/edit/master/{{ post.relativeSource }}">Found a typo? Edit this page on GitHub</a>
      </p>
      <p>
        Written on &nbsp; <b>{{ post.data.date | isoday }}</b>
      </p>
      <p>
        {{ post.htmlContent | words }} words - {{ post.htmlContent | readingTime }} 🕜
      </p>
    </header>
    <div class="main-content">{{ post.htmlContent | safe }}</div>
  </article>
  {% include 'subscribe-to-newsletter.html' %}
{% endfor %}
</div>
{% endblock %}
