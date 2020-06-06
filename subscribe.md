---
layout: page.njk
title: Subscribe to my bi-weekly newsletter!
js:
  - https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js
  - /assets/js/subscribers.js
---

{% block content %}
{% include 'subscribe-to-newsletter.html' %}
<div reversed class="">
  <div class="">
    <img src="/assets/images/speech-bubble-unsub.png">
  </div>
  <div class=" tar">
    <img src="/assets/images/cf4.png">
  </div>
</div>

<script type="text/javascript">
window.subscribers = {{ collections.subscribers | reverse | json | safe }}
</script>

<h1>Join {{collections.subscribers.length}} subscribers!</h1>

<div class="chart-container" style="height: 200px">
  <canvas id="chart" style="height: 200px"></canvas>
</div>
{% endblock %}
