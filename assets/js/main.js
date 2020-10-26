window.makeSearchable = makeSearchable
window.lazyLoad = lazyLoad
window.processExternalLinks = processExternalLinks
window.tracked = {}

main()

function main () {
  ;[...document.querySelectorAll('.searchable')].forEach(makeSearchable)
  ;[...document.querySelectorAll('[class*="track-"]')].forEach(trackClick)
  Object.keys(window.localStorage).forEach(key => {
    if (/^track-/.test(key)) {
      window.plausible && window.plausible('clicked ' + key.replace('track-', ''))
      window.localStorage.removeItem(key)
    }
  })

  try { processExternalLinks() } catch (err) { console.error(err.message, err) }

  try { lazyLoad('[lazy]') } catch (err) { console.error(err.message, err) }

  try { makeAnchorTitles() } catch (err) { console.error(err.message, err) }

  if ((window.location.search || '').includes('dark')) {
    trackEvent('used darkmode')
    document.body.classList.add('dark-mode')
    addDarkmodeQueryToInternalLinks()
  }

  const slideIn = document.querySelector('.subscribe-slidein')
  if (slideIn) { handleSubscribeSlidein(slideIn) }

  getCurrentVisitors().then(showCurrentVisitors)
  setInterval(() => getCurrentVisitors().then(showCurrentVisitors), 60000)
}

function showCurrentVisitors (currentVisitors = 0) {
  const container = document.getElementById('current-visitors-container')
  if (!container) return console.info('no container to show current visitors found')
  container.innerHTML = `
  <a aria-hidden tabindex="-1" href="https://plausible.io/cri.dev" rel="nofollow noopener external" target="_blank">
    ${currentVisitors}&nbsp;<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>
  </a>
  `.trim()
}

function getCurrentVisitors () {
  return window.fetch('https://current-visitors.cri.dev/')
    .then((res) => res.text())
}

function trackEvent (name, once = true) {
  if (window.plausible) {
    if (once && !window.tracked[name]) {
      window.tracked[name] = true
      window.plausible(name)
    }
    if (!once) {
      window.plausible(name)
    }
  }
}

function trackClick ($el) {
  if ($el && $el.nodeName === 'A') {
    $el.addEventListener('click', function (e) {
      const trackClass = e.target.getAttribute('class').split(' ').find(c => /^track-.*/.test(c))
      if (trackClass) window.localStorage.setItem(trackClass, 1)
    })
  }
}
function makeSearchable ($searchable) {
  const $search = $searchable.querySelector('input') || document.createElement('input')
  $search.setAttribute('class', 'searchable-input')
  $search.setAttribute('placeholder', '🔍 Search posts... (E.g. "2019", "node", "elixir", "puppeteer", "how to", "mongo")')
  $search.onkeyup = handleSearchKeyUp
  $searchable.parentNode.insertBefore($search, $searchable)

  function handleSearchKeyUp (e) {
    const searchTerm = e.target.value
    const searchRegExp = new RegExp(searchTerm, 'i')
    const $searchableItems = [...($searchable.querySelectorAll('.searchable-item') || [])]
    if ($searchableItems.length > 500) $searchableItems.length = 500

    $searchableItems.forEach(function ($el) {
      const show = !searchTerm || searchRegExp.test($el.innerText)
      if (!show) {
        $el.style.display = 'none'
      } else {
        $el.style.display = 'block'
      }
    })
    trackEvent('used search')
  }
}

function lazyLoad (selector = '[lazy]') {
  let $lazy = typeof selector === 'string' ? [...document.querySelectorAll(selector)] : [...selector]

  $lazy = $lazy.filter(toApplyLazyLoad)

  let lastCheck = Date.now()
  let scrolling = false
  const scrollIntervalHandle = setInterval(() => {
    if (scrolling && lastCheck > Date.now() - 3000) {
      $lazy = $lazy.filter(toApplyLazyLoad)
    } else {
      scrolling = false
    }
    if ($lazy.length === 0) {
      clearInterval(scrollIntervalHandle)
    }
  }, 100)
  document.addEventListener('scroll', registerScrolling, { capture: false, passive: true })
  document.addEventListener('wheel', registerScrolling, { capture: false, passive: true })
  document.addEventListener('touchmove', registerScrolling, { capture: false, passive: true })
  document.addEventListener('touchstart', registerScrolling, { capture: false, passive: true })
  document.addEventListener('touchend', registerScrolling, { capture: false, passive: true })
  const lazyContainers = document.querySelectorAll('.lazy-container')
  if (Array.isArray(lazyContainers) && lazyContainers.length > 0) {
    lazyContainers.addEventListener('scroll', registerScrolling, { capture: false, passive: true })
    lazyContainers.addEventListener('wheel', registerScrolling, { capture: false, passive: true })
    lazyContainers.addEventListener('touchmove', registerScrolling, { capture: false, passive: true })
    lazyContainers.addEventListener('touchstart', registerScrolling, { capture: false, passive: true })
    lazyContainers.addEventListener('touchend', registerScrolling, { capture: false, passive: true })
  }

  function registerScrolling () {
    lastCheck = Date.now()
    scrolling = true
  }

  function toApplyLazyLoad (el) {
    return el && !(isScrolledIntoView(el) && applyLazy(el))
  }

  function applyLazy (el) {
    if (!el) return
    const imageUrl = el.getAttribute('lazy')
    if (el instanceof window.HTMLImageElement) {
      el.setAttribute('src', imageUrl)
    } else {
      el.style.backgroundImage = `url(${imageUrl})`
      el.style.backgroundPosition = 'center'
    }
    return true
  }
}

function isScrolledIntoView (el) {
  if (!el) return
  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
  )
}

function makeAnchorTitles () {
  document
    .querySelectorAll('h1:not(.title),h2,h3,h4,h5,h6')
    .forEach(function (heading) {
      if (heading.classList.contains('no-anchor')) return
      if (heading.querySelector('a')) return

      const id = heading.id || (heading.innerText || '').toLowerCase().replace(/ /gi, '-').replace(/[^a-z0-9-]/gi, '')
      heading.id = id
      heading.innerHTML = '<a href="#' + id + '">' + heading.innerText + '</a>'
    })
}

function processExternalLinks () {
  const externalLinks = [...document.querySelectorAll(`body a:not([href~='${window.location.hostname}']):not([href^='/'])`)]
  externalLinks.forEach(el => {
    if (el.getAttribute('href').startsWith('#')) return
    el.setAttribute('target', '_blank')
    !el.getAttribute('rel') && el.setAttribute('rel', 'nofollow noopener external')
  })
}

function addDarkmodeQueryToInternalLinks () {
  const internal = [...document.querySelectorAll(`a[href~='${window.location.hostname}'], a[href^='/']`)]
  internal.forEach(el => el.setAttribute('href', el.getAttribute('href') + '?dark'))
}

function handleSubscribeSlidein (slideIn) {
  console.log('registered slideIn')
  const close = slideIn.querySelector('.close-subscribe-slidein')
  let closed = window.localStorage.getItem('closedSubscribe') || false
  if (!closed) {
    close && close.addEventListener('click', function () {
      closed = true
      window.localStorage.setItem('closedSubscribe', true)
      slideIn.style.display = 'none'
    })
    document.addEventListener('scroll', function () {
      if (closed) return
      if (document.body.scrollHeight / 3 < window.scrollY) {
        slideIn.style.display = 'block'
      }
    }, { capture: false, passive: true })
  }
}
