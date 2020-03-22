---
layout: page.njk
title: Recommended books
---

{% block content %}

<h3 class="no-mt">Recommended books</h3>

<div reversed class="flex flex-wrap">
  {% for book in collections.books %}
    <a href="{{ book.url }}" class="post-link flex-item pad-half book">
      {{ book.title }}
    </a>
  {% endfor %}
</div>

{% endblock %}