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

<h3 class="no-mt">Contributions on GitHub</h3>

<div class="flex flex-wrap">
  <div class="flex-item flex-05" style="width: 400px; height: 400px">
    <canvas id="yearsChart"></canvas>
  </div>

  <dl class="flex-item flex-05" style="height: 250px; overflow-y: scroll; text-align: right;">
    {% for contribution in collections.contributionsByYear %}
      <dt><b>{{ contribution.year }}</b></dt> <dd>{{ contribution.total }} public commits</dd>
    {% endfor %}
  </dl>
</div>


<div  class="contributions-grid">
  {% for contribution in collections.contributionsByDay %}
    <div style="background-color: {{ contribution.color }}" data-date="{{ contribution.date }}">{{ contribution.count }}</div>
  {% endfor %}
</div>

{% endblock %}