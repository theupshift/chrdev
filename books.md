---
layout: layout.njk
title: Recommended books
---

<h3 class="no-mt">Recommended books</h3>

<div reversed class="flex flex-wrap">
{% for book in books %}
  <a href="{{ book.url }}" class="post-link flex-item pad-half book">
    {{ book.title }}
  </a>
{% endfor %}
</div>
