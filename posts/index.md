---
layout: page.njk
title: Posts
---

{% block content %}

<b><a href="/archive/" class="cta">Visit the archive</a> to see all {{ collections.post.length }} posts</b>

{% include 'subscribe-to-newsletter.html' %}

<div class="alert" style="max-width: 45em">
  <p>
    Below you can skim through <b>articles</b> I wrote over the years.
  </p>
  <p>
    node.js, crypto, testing, tutorials, thoughts and more.
  </p>
</div>

<div class="posts flex flex-wrap">
{% for post in collections.featured | reverse | limit10 %}
  <article class="mt5">
    <h1 class="title {% if post.data.image %} has-image {% endif %}"  {% if post.data.image %}lazy="{{ post.data.image }}"{% endif %}><span><a href="{{ post.url }}">{{ post.data.title }}</a></span></h1>
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
    <div>{{ post.htmlContent | safe }}</div>
  </article>
{% endfor %}
</div>
{% endblock %}
