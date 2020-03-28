---
layout: page.njk
title: Contributions
js:
  - https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js
  - /assets/js/contributions.js
---

{% block content %}

<script type="text/javascript">
window.contributionsByYear = {{collections.contributionsByYear | reverse | json | safe}}
</script>

<h3 class="no-mt">Open Source Contributions<br/><small><i>on <a href="https://github.com/christian-fei">GitHub</a></i></small></h3>

You can **support me** through my [GitHub Sponsor page ✌️](https://github.com/sponsors/christian-fei)


<div class="flex flex-wrap">
  <div class="flex-item flex-05" style="width: 400px; height: 300px">
    <canvas id="yearsChart"></canvas>
  </div>

  <dl class="flex-item flex-05" style="height: 250px; overflow-y: scroll; text-align: right;">
    {% for contribution in collections.contributionsByYear %}
      <dt><b>{{ contribution.year }}</b></dt> <dd>{{ contribution.total }} public commits</dd>
    {% endfor %}
  </dl>
</div>

Check out my [GitHub Profile 🤖](https://github.com/christian-fei)


<div class="contributions-grid">
  {% for contribution in collections.contributionsByDay %}
    <div style="background-color: {{ contribution.color }}" data-count="{{ contribution.count }}" data-date="{{ contribution.date }}">{{ contribution.count }}</div>
  {% endfor %}
</div>

<script type="text/javascript">
const first = document.querySelector('[data-count]:not([data-count^="0"])')
first && first.scrollIntoView()
</script>

{% endblock %}