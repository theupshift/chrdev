window.initSearchable = initSearchable

main()

function main () {
  const $searchables = document.querySelectorAll('.searchable')

  if ($searchables) {
    $searchables.forEach(initSearchable)
  }

  const $headingsToAnchor = document.querySelectorAll('h1:not(.no-anchorify), h2:not(.no-anchorify), h3:not(.no-anchorify)')
  if ($headingsToAnchor) {
    // $headingsToAnchor.forEach(anchorify)
  }

  window.addEventListener('DOMContentLoaded', (event) => {
    // setTimeout(() => document.getElementById('main').scrollIntoView({ behavior: 'smooth' }), 100)
  })

  const articleHeadings = document.querySelectorAll('article h1, article h2')
  const middle = parseInt(articleHeadings.length / 2, 10)
  if (articleHeadings[middle]) {
    articleHeadings[middle].parentNode.insertBefore(document.querySelector('.newsletter').cloneNode(true), articleHeadings[middle])
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

function anchorify (element) {
  const id = (element.innerText || '').toLowerCase().replace(/ /gi, '-')
  element.setAttribute('id', id)
  const text = element.innerText
  element.innerHTML = `<a href="#${id}">${text}</a>`
}
