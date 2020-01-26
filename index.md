---
layout: layout.njk
title: Home
---

👋 Hello, and <b>welcome to my blog</b>

<b>My name is Christian</b>, as you might have guessed

Ah, and I'm a <b>passionate web developer</b> from <b>Italy</b> 🇮🇹

This is the space on the web where I share my findings, ideas and technical articles around programming

You can read a bit more <a href="/about">about me here</a>

<br>

<h1 class="title tac">Featured blog posts</h1>

<div class="flex free ovs">
{% for post in collections.featured %}
  <div class="flex-item post-item featured-post" style="min-width: 333px; background-image: url({{post.data.image}})">
    <a href="{{ post.url }}" class="tdn">
      <b class="post-title">{{ post.data.title | capitalize }}</b>
      <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
    </a>
  </div>
{% endfor %}
</div>

See <a href="/posts/">all {{ collections.posts.length }} blog posts</a> I wrote since 2012.
