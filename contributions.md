---
layout: page.njk
title: Contributions
---

{% block content %}

<h3 class="no-mt">Contributions on GitHub</h3>

<dl  class="">
  {% for contribution in collections.contributionsByYear %}
    <dt><b>{{ contribution.year }}</b></dt> <dd>{{ contribution.total }} public commits</dd>
    <!-- <li style="background-color: {{contribution.color}}">{{ contribution.date }} -- {{ contribution.count }}</li> -->
  {% endfor %}
</dl>

<div  class="contributions-grid">
  {% for contribution in collections.contributionsByDay %}
    <div style="background-color: {{ contribution.color }}" data-date="{{ contribution.date }}">{{ contribution.count }}</div>
    <!-- <li style="background-color: {{contribution.color}}">{{ contribution.date }} -- {{ contribution.count }}</li> -->
  {% endfor %}
</div>

{% endblock %}