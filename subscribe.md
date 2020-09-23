---
layout: page.njk
title: Subscribe to my bi-weekly newsletter!
js:
  - https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js
  - /assets/js/subscribers.js
---

{% block content %}

{% include 'stay-in-touch.html' %}

<script type="text/javascript">
window.subscribers = {{ collections.subscribers | reverse | json | safe }}
</script>

<h1 class="no-anchor">Join {{collections.subscribers.length}} subscribers!</h1>

[View the past editions of my newsletter](https://buttondown.email/christianfei/archive/)

<div class="chart-container" style="height: 200px">
  <canvas id="chart" style="height: 200px"></canvas>
</div>


<div reversed class="">
  <div class="">
    <img class="no-shadow" src="/assets/images/speech-bubble-unsub.png">
  </div>
  <div class=" tar">
    <img class="no-shadow" src="/assets/images/cf4.webp">
  </div>
</div>

{% endblock %}
