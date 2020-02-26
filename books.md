---
layout: layout.njk
title: Recommended books
---

<p>
  <strong>Recommended books</strong>
</p>

<ol reversed class="searchable1">
{% for book in books %}
  <li class="post-item">
    <!-- <time datetime="{{ book.data.date | date: '%Y-%m-%d' }}" class="post-date">{{ book.data.date | date: '%Y-%m-%d' }}</time> -->
    <a href="{{ book.url }}" class="post-link">
      {{ book.title | capitalize }}
    </a>
    <br>
    {% if book.preview %}
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="{{book.preview}}" ></iframe>
    {% endif %}
  </li>
{% endfor %}
</ol>
