---
layout: page.njk
title: Contributions
css:
  - /assets/css/contributions.css
js:
  - https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js
  - /assets/js/contributions.js
---

{% block content %}

<script type="text/javascript">
window.contributionsByYear = {{ collections.contributionsByYear | reverse | json | safe }}
</script>

<h1 class="no-mt">Open Source Contributions<br/><small><i>on <a href="https://github.com/christian-fei">GitHub</a></i></small></h1>

You can **support me** through my [GitHub Sponsor page ✌️](https://github.com/sponsors/christian-fei)


<div class="pure-g">
  <div class="pure-u-1 pure-u-md-1-2" style="width: 400px; height: 400px">
    <canvas id="yearsChart"></canvas>
  </div>

  <dl class="pure-u-1 pure-u-md-1-2" style="height: 250px; min-width: 20em; overflow-y: scroll; text-align: left; padding-left: 2em;">
    {% for contribution in collections.contributionsByYear %}
      <dt><b>{{ contribution.year }}</b> - {{ contribution.total }} public commits</dt>
    {% endfor %}
  </dl>
</div>

Check out my <a href="https://github.com/christian-fei" class="cta">GitHub Profile 🤖</a>


<div class="contributions-grid">
  {% for contribution in collections.contributionsByDay %}
    <div style="background-color: {{ contribution.color }}" data-count="{{ contribution.count }}" data-date="{{ contribution.date }}">{{ contribution.count }}</div>
    {% if contribution.date.match('-01$') %}
      <br>
      <h2>{{ contribution.date.substring(0, 7)}}</h2>
    {% endif %}
  {% endfor %}
</div>

{% endblock %}