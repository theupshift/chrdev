window.initSearchable = initSearchable

main()

function main () {
  const $searchables = [...document.querySelectorAll('.searchable')]

  if ($searchables) {
    $searchables.forEach(initSearchable)
  }

  const $lazyBackgrounds = [...document.querySelectorAll('[lazy-background]')]

  let lastCheck = Date.now()

  $lazyBackgrounds.forEach(applyLazyBackgroundImage)
  window.onscroll = function (e) {
    if ($lazyBackgrounds.length === 0 || lastCheck > Date.now() - 5) return
    console.log('lazy bg')
    lastCheck = Date.now()

    if ($lazyBackgrounds) {
      $lazyBackgrounds.forEach(applyLazyBackgroundImage)
    }
  }
}

function initSearchable ($searchable) {
  const $search = document.createElement('input')
  $search.setAttribute('class', 'searchable-input')
  $search.setAttribute('type', 'test')
  $search.setAttribute('placeholder', 'Search posts...')
  $search.onkeyup = handleSearchKeyUp
  $searchable.parentNode.insertBefore($search, $searchable)

  function handleSearchKeyUp (e) {
    const searchTerm = e.target.value
    const searchRegExp = new RegExp(searchTerm.replace(' ', '.*'), 'i')
    const $searchableItems = $searchable.querySelectorAll('li') || []
    const postTitles = Array.prototype.map.call($searchableItems, $el => $el.innerText)
    const noMatch = postTitles.filter(t => searchRegExp.test(t)).length === 0

    let $noMatch = document.getElementById('no-match')

    if (noMatch) {
      if (!$noMatch) {
        $noMatch = document.createElement('div')
        $noMatch.setAttribute('id', 'no-match')
        $noMatch.innerText = 'No matches'
        $searchable.prepend($noMatch)
      }
    } else {
      if ($noMatch) $searchable.removeChild($noMatch)
    }

    $searchableItems.forEach(function ($postLi) {
      const show = noMatch || !searchTerm || searchRegExp.test($postLi.innerText)
      if (!show) {
        $postLi.style.display = 'none'
      } else {
        $postLi.style.display = 'list-item'
      }
    })
  }
}

function applyLazyBackgroundImage (el, index, array) {
  if (isScrolledIntoView(el)) {
    const bg = el.getAttribute('lazy-background')
    console.log('applying bg', bg)
    el.style.backgroundImage = `url(${bg})`
    Array.isArray(array) && array.splice(index, 1)
  }
}

function isScrolledIntoView (el) {
  var rect = el.getBoundingClientRect()
  var elemTop = rect.top
  var elemBottom = rect.bottom
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight)
  return isVisible
}
