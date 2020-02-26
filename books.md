---
layout: layout.njk
title: Recommended books
---

<h3>Recommended books</h3>

<div reversed class="flex flex-wrap">
{% for book in books %}
  <div class="flex-item pad-half book">
    <a href="{{ book.url }}" class="post-link">
      {{ book.title }}
    </a>
  </div>
{% endfor %}
</div>
