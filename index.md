---
layout: layout.njk
title: Home
---

Hello, and <b>welcome to my blog</b>

<b>My name is Christian</b> and I'm a <a href="https://www.linkedin.com/in/christian-fei-6b72b5123/" target="_blank">passionate web developer</a> from <b>Italy</b>

This is the <b>space on the web</b> where I <b>share</b> stuff in written form

You can <a href="https://twitter.com/christian_fei" target="_blank">follow me on twitter</a> and read a bit more <a href="/about">about me here</a>

<br>

<h1 class="title tac">Featured blog posts</h1>

<div class="flex ovh-s">
{% for post in collections.featured %}
  <a href="{{ post.url }}" class="tdn flex-item post-item featured-post" lazy="{{post.data.image}}">
    <b class="post-title">{{ post.data.title | capitalize }}</b>
    <span class="post-date">{{ post.data.date | date: '%Y-%m-%d' }}</span>
  </a>
{% endfor %}
</div>

See <a href="/posts/">all {{ collections.posts.length }} blog posts</a> I wrote since 2012.
