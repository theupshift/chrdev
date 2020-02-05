window.initSearchable = initSearchable

main()

function main () {
  const $searchables = [...document.querySelectorAll('.searchable')]

  if ($searchables) {
    $searchables.forEach(initSearchable)
  }

  lazyBackgroundImages([...document.querySelectorAll('[lazy-background]')])
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

function lazyBackgroundImages ($lazy = [...document.querySelectorAll('[lazy-background]')]) {
  window.addEventListener('DOMContentLoaded', () => {
    $lazy = $lazy.filter(el => !applyLazyBackgroundImage(el))
  })

  let lastCheck = Date.now()
  window.onscroll = function (e) {
    if ($lazy.length === 0 || lastCheck > Date.now() - 50) return
    lastCheck = Date.now()

    if ($lazy) {
      $lazy = $lazy.filter(el => !applyLazyBackgroundImage(el))
    }
  }

  function applyLazyBackgroundImage (el, index, array) {
    if (isScrolledIntoView(el)) {
      const bg = el.getAttribute('lazy-background')
      el.style.backgroundImage = `url(${bg})`
      return true
    }

    function isScrolledIntoView (el) {
      var rect = el.getBoundingClientRect()
      var isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight)
      return isVisible
    }
  }
}
