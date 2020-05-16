window.makeSearchable = makeSearchable
window.lazyLoad = lazyLoad
window.makeExternalLinksTargetBlank = makeExternalLinksTargetBlank

main()

function main () {
  [...document.querySelectorAll('.searchable')].forEach(makeSearchable)

  try { makeExternalLinksTargetBlank() } catch (err) { console.error(err.message, err) }

  try { lazyLoad('[lazy]') } catch (err) { console.error(err.message, err) }

  try { makeAnchorTitles() } catch (err) { console.error(err.message, err) }

  if ((window.location.search || '').includes('dark')) {
    document.body.classList.add('dark-mode')
    addDarkmodeQueryToInternalLinks()
  }
}

function makeSearchable ($searchable) {
  const $search = document.createElement('input')
  $search.setAttribute('class', 'searchable-input')
  $search.setAttribute('type', 'test')
  $search.setAttribute('placeholder', 'Search posts...')
  $search.onkeyup = handleSearchKeyUp
  $searchable.parentNode.insertBefore($search, $searchable)
  $search.focus()

  function handleSearchKeyUp (e) {
    const searchTerm = e.target.value
    const searchRegExp = new RegExp(searchTerm.replace(' ', '.*'), 'i')
    const $searchableItems = [...($searchable.querySelectorAll('a,li,div') || [])]
    if ($searchableItems.length > 200) $searchableItems.length = 200
    const postTitles = $searchableItems.map($el => $el.innerText)
    const noMatch = postTitles.filter(t => searchRegExp.test(t)).length === 0

    $searchableItems.forEach(function ($postLi) {
      const show = noMatch || !searchTerm || searchRegExp.test($postLi.innerText)
      if (!show) {
        $postLi.style.display = 'none'
      } else {
        $postLi.style.display = 'block'
      }
    })
  }
}

function lazyLoad (selector = '[lazy]') {
  let $lazy = typeof selector === 'string' ? [...document.querySelectorAll(selector)] : [...selector]

  $lazy = $lazy.filter(toApplyLazyLoad)

  let lastCheck
  document.addEventListener('wheel', lazyCheck, { capture: false, passive: true })
  const lazyContainers = document.querySelectorAll('.lazy-container')
  if (Array.isArray(lazyContainers) && lazyContainers.length > 0) {
    lazyContainers.addEventListener('wheel', lazyCheck, { capture: false, passive: true })
  }

  function lazyCheck () {
    if (lastCheck && $lazy.length === 0 && lastCheck > Date.now() - 50) { return }
    lastCheck = Date.now()
    $lazy = $lazy.filter(toApplyLazyLoad)
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
    }
    return true
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

function makeExternalLinksTargetBlank () {
  const externalLinks = [...document.querySelectorAll(`body a:not([href~='${window.location.hostname}']):not([href^='/'])`)]
  externalLinks.forEach(el => {
    if (el.getAttribute('href').startsWith('#')) return
    el.setAttribute('target', '_blank')
  })
}
function addDarkmodeQueryToInternalLinks () {
  const internal = [...document.querySelectorAll(`a[href~='${window.location.hostname}'], a[href^='/']`)]
  internal.forEach(el => el.setAttribute('href', el.getAttribute('href') + '?dark'))
}
