---
layout: page.njk
title: Portfolio
---

{% block content %}
<div class="card">
  <h1 class="title">Portfolio</h1>
  <br>
  <div class="flex">
    <div class="half" style="min-width: 25em;">
      <div class="">
        <h1 class="title">
          <a href="https://productlistings.app">ProductListings.app</a>
        </h1>
        <p>
          Create professional looking product listings in minutes
          <blockquote>
            To sell a product, you need to be trusted by the potential buyer. To be trusted, a clean presentation of the product makes the difference
          </blockquote>
        </p>
      </div>
    </div>
    <div class="half" style="min-width: 25em;">
      <div class="">
        <h1 class="title">
          <a href="https://github.com/christian-fei/mega-scraper">mega-scraper 📦</a>
        </h1>
        <p>
          <blockquote>
            > scrape a website's content.
          </blockquote>
          Handy utility to do web scraping with node.js
          <br>
          using puppeteer, https proxies, ad blocking and request optimisations
        </p>
      </div>
    </div>
    <div class="half" style="min-width: 25em;">
      <div class="">
        <h1 class="title">
          <a href="https://github.com/christian-fei/devblog">devblog 📦</a>
        </h1>
        <p>
          <blockquote>
            > yet another static site generator
          </blockquote>
          <pre>
            npm i -g devblog
          </pre>
          A fast static site or blog generator
        </p>
      </div>
    </div>
    <div class="half" style="min-width: 25em;">
      <div class="">
        <h1 class="title">
          <a href="https://github.com/christian-fei/Simple-Jekyll-Search">Simple Jekyll Search 📦</a>
        </h1>
        <p>
          <blockquote>
            > A JavaScript library to add search functionality to any Jekyll blog.
          </blockquote>
          <pre>
            npm i simple-jekyll-search
          </pre>
        </p>
      </div>
    </div>
    <div class="half" style="min-width: 25em;">
      <div class="">
        <h1 class="title">
          <a href="https://github.com/christian-fei/">More on GitHub 📦</a>
        </h1>
      </div>
    </div>
  </div>
</div>
{% endblock %}
