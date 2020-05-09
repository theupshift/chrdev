---
layout: page.njk
title: You rock!
---

{% block content %}
  <div class="">
    <h2>Thanks for subscribing!</h2>
    <div class="tac">
      <img style="padding: 1em" id="thanks-gif">
    </div>
    <p>You'll shortly receive the latest issue of the newsletter, enjoy!</p>
    <p>Let's stay in touch  <a href="https://twitter.com/christian_fei">on Twitter</a>!</p>
    <p>You can also <a href="https://buttondown.email/christianfei/archive">look through the archives</a> of the newsletter if you missed an issue</p>
  </div>
  <script type="text/javascript">
    const thanksGIF = document.getElementById('thanks-gif')
    const rand = Math.random()
    if (rand < 0.25) changeGIF('https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif', thanksGIF)
    else if (rand < 0.5) changeGIF('https://media.giphy.com/media/AeWoyE3ZT90YM/giphy.gif', thanksGIF)
    else if (rand < 0.75)  changeGIF('https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy.gif', thanksGIF)
    else changeGIF('https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif', thanksGIF)
    function changeGIF (src, element) {
      if (element) {
        const rand = Math.random()
        console.log('rand', rand)
        if (rand < 0.25) element.src = 'https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif'
        else if (rand < 0.5) element.src = 'https://media.giphy.com/media/AeWoyE3ZT90YM/giphy.gif'
        else if (rand < 0.75)  element.src = 'https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy.gif'
        else element.src = 'https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif'
      }
    }

  </script>
{% endblock %}
