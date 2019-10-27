window.onload = function () {
  if (window.outerWidth < 768) return console.info('guard share-paragraph')
  const paragraphs = document.querySelectorAll('main p:not(.no-share)')
  paragraphs.forEach(p => {
    const el = document.createElement('a')
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`"${p.innerText}" by @christian_fei`)
    el.setAttribute('href', `https://twitter.com/intent/tweet?original_referer=${url}&ref_src=twsrc%5Etfw&text=${text}&tw_p=tweetbutton&url=${url}`)
    el.setAttribute('target', '_blank')
    el.setAttribute('aria-hidden', 'true')
    el.classList.add('share-paragraph')
    el.innerText = `Share “`
    p.appendChild(el)
    p.classList.add('share-paragraph-hover')
  })
}
