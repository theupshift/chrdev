---
layout: layout.njk
title: Recommended books
---

<h3>Recommended books</h3>

<div reversed class="flex flex-wrap">
{% for book in books %}
  <div class="flex-item pad-half">
    <!--
    <a href="{{ book.url }}" class="post-link">
      {{ book.title | capitalize }}
    </a>
    <br>
    -->
    {% if book.preview %}
<iframe class="amazon-book-preview" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="{{book.preview}}" ></iframe>
    {% endif %}
  </div>
{% endfor %}
</div>
