---
layout: landing.njk
title: Learn Testing with Node.js & JavaScript
css:
  - /learn-testing-nodejs-javascript/index.css
---

{% block cta %}
<div class="col-xl-9 mx-auto">
  <h2 class="mb-4">Ready to get started? Sign up now!</h2>
</div>
<div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
    class="embeddable-buttondown-form"
  >
    <input type="hidden" name="tag" value="learn-testing" />
    <input type="hidden" value="1" name="embed"></input>
    <div class="form-row">
      <div class="col-12 col-md-9 mb-2 mb-md-0">
        <input type="email" name="email" id="bd-email" class="form-control form-control-lg" placeholder="Enter your email to be notified 🚀">
      </div>
      <div class="col-12 col-md-3">
        <button type="submit" class="btn btn-block btn-lg btn-primary">Sign up!</button>
      </div>
    </div>
  </form>
</div>
{% endblock %}

{% block masthead %}
<div class="row">
  <div class="col-xl-9 mx-auto mb-5">
    <h1 class="no-anchor">
      Learn Testing
      <span class="with-chris">with <a href="https://twitter.com/christian_fei">Chris <img class="logo vam no-shadow" src="/assets/images/cf4.64x64.webp" alt=""></a></span>
    </h1>
    <h2 class="no-anchor">
      using Node.js & JavaScript
    </h2>
  </div>
  <div class="col-md-10 col-lg-8 col-xl-7 mx-auto mb-5">
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <input type="hidden" name="tag" value="learn-testing" />
      <input type="hidden" value="1" name="embed"></input>
      <div class="form-row">
        <div class="col-12 col-md-9 mb-2 mb-md-0">
          <input type="email" name="email" id="bd-email" class="form-control form-control-lg" placeholder="Enter your email to be notified 🚀">
        </div>
        <div class="col-12 col-md-3">
          <button type="submit" class="btn btn-block btn-lg btn-primary">Sign up!</button>
        </div>
      </div>
    </form>
  </div>
  <div class="col-md-10 col-lg-8 col-xl-7 mx-auto mb-5">
    <p style="font-size: 1.5em;">
      Don't know how to start writing your first test?
    </p>
    <p style="font-size: 1.5em;">
      Struggling to build maintainable applications?
    </p>
    <p style="font-size: 1.5em;">
      Wasting time or getting lost in spaghetti code?
    </p>
  </div>
  <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
    <h1 class="display-4">Learn more&nbsp;👇</h1>
  </div>
</div>
{% endblock %}

{% block features%}
<div class="row">
  <div class="col-lg-4">
    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
      <div class="features-icons-icon d-flex">
        <i class="icon-screen-desktop m-auto text-primary"></i>
      </div>
      <h3>Approachable</h3>
      <p class="lead mb-0">Approachable guide for <b>beginners</b> and <b>experienced software developers</b></p>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
      <div class="features-icons-icon d-flex">
        <i class="icon-layers m-auto text-primary"></i>
      </div>
      <h3>Level up your skills</h3>
      <p class="lead mb-0">Improve</b> your coding skills and build <b>maintainable web applications</b> 📈</p>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="features-icons-item mx-auto mb-0 mb-lg-3">
      <div class="features-icons-icon d-flex">
        <i class="icon-check m-auto text-primary"></i>
      </div>
      <h3>Easy to follow</h3>
      <p class="lead mb-0">Step by step examples and explanation&nbsp;🐶</p>
    </div>
  </div>
</div>
{% endblock%}

{% block showcase %}
<div class="row no-gutters">
  <div class="col-lg-6 order-lg-2 text-white showcase-img" style="background-image: url('img/bg-showcase-1.jpg');"></div>
  <div class="col-lg-6 order-lg-1 my-auto showcase-text">
    <h2>Fully Responsive Design</h2>
    <p class="lead mb-0">When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!</p>
  </div>
</div>
<div class="row no-gutters">
  <div class="col-lg-6 text-white showcase-img" style="background-image: url('img/bg-showcase-2.jpg');"></div>
  <div class="col-lg-6 my-auto showcase-text">
    <h2>Updated For Bootstrap 4</h2>
    <p class="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 4 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 4!</p>
  </div>
</div>
<div class="row no-gutters">
  <div class="col-lg-6 order-lg-2 text-white showcase-img" style="background-image: url('img/bg-showcase-3.jpg');"></div>
  <div class="col-lg-6 order-lg-1 my-auto showcase-text">
    <h2>Easy to Use &amp; Customize</h2>
    <p class="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>
  </div>
</div>
{% endblock%}

{% block testimonials %}
<h2 class="mb-5">What people are saying...</h2>
<div class="row">
  <div class="col-lg-4">
    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
      <img class="img-fluid rounded-circle mb-3" src="img/testimonials-1.jpg" alt="">
      <h5>Margaret E.</h5>
      <p class="font-weight-light mb-0">"Lorem ipsum!"</p>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
      <img class="img-fluid rounded-circle mb-3" src="img/testimonials-2.jpg" alt="">
      <h5>Fred S.</h5>
      <p class="font-weight-light mb-0">"Lorem ipsum!"</p>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
      <img class="img-fluid rounded-circle mb-3" src="img/testimonials-3.jpg" alt="">
      <h5>Sarah W.</h5>
      <p class="font-weight-light mb-0">"Lorem ipsum!"</p>
    </div>
  </div>
</div>
{% endblock %}

{% block content %}
<div class="alert">
  <h1 class="no-anchor" style="font-size: 5em">
    Learn Testing
     <span class="with-chris">with <a href="https://twitter.com/christian_fei">Chris <img class="logo vam no-shadow" src="/assets/images/cf4.64x64.webp" alt=""></a></span>
  </h1>
  <h4 class="no-anchor">
    Don't know how to start writing your first test? &nbsp;😰
  </h4>
  <h4 class="no-anchor">
    🤔&nbsp;Struggling to build maintainable applications?
  </h4>
  <h4 class="no-anchor">
    Wasting time or getting lost in spaghetti code?&nbsp; 🤮
  </h4>
  <div class="tac">
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <h2 class="no-anchor no-mt tac">
        Sharpen your developer skills 👩‍💻
      </h2>
      <input type="email" name="email" id="bd-email" placeholder="Enter your email to get notified on the launch 🚀" class="block-input">
      <input type="hidden" name="tag" value="learn-testing" />
      <input type="hidden" value="1" name="embed"></input>
      <input type="submit" value="Subscribe" class="block-input"></input>
      <p class="contained">
        Approachable guide for <b>beginners</b> and <b>experienced software developers</b>.
        <br>
        <b>Improve</b> your coding skills and build <b>maintainable web applications</b> 📈
        <br>
        <b>Step by step examples and explanation</b> 🐶
      </p>
    </form>
  </div>
  <div class="contained tal">
    <p>
      <h2 class="no-anchor">
        Learn about Testing and TDD<br> with practical examples
      </h2>
    </p>
    <p>
      You will learn about test driving your full-stack web application from the ground up.
    </p>
    <p>
      Apply changes and develop features with confidence, doing safe and incremental steps.
    </p>
    <div class="tal contained">
      <h3 class="no-anchor">Bonus chapters included</h3>
      <ul>
        <li>📗&nbsp;Continuous Integration & Deployment</li>
        <li>👌&nbsp;Best practices</li>
        <li>✨&nbsp;Clean code introduction</li>
      </ul>
    </div>
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
      class="embeddable-buttondown-form secondary"
    >
      <input type="email" name="email" id="bd-email" placeholder="Subscribe to the newsletter to get notified on the launch 🚀" class="block-input">
      <input type="hidden" name="tag" value="learn-testing" />
      <input type="hidden" value="1" name="embed"></input>
      <input type="submit" value="Subscribe" class="block-input"></input>
    </form>
  </div>
</div>

{% endblock %}