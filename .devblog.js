const CleanCSS = require("clean-css")
const crypto = require("crypto")
const [commitLong, date, ...commitDescription] = require('child_process')
  .execSync(`git log -1 --no-color`)
  .toString()
  .split('\n')
  .filter(Boolean)
  .map(l => l.trim())
  .filter(l => !l.startsWith('Author:'))
const commit = commitLong.replace(/^commit /, '').substring(0, 7)
const year = new Date().getFullYear()
const today = new Date().toISOString().substring(0, 10)
const cache = new Map()
function createHash(str) {
  return crypto
    .createHash("sha256")
    .update(str)
    .digest("hex")
}


module.exports = {
  ignoredFiles: ['.npmrc', 'secrets', 'secrets.example', 'scripts/*', 'cypress/*', 'cypress.json', 'buffer-automation', 'buttondown*'],

  collections: {
    books: require('./_data/books.json'),
    subscribers: require('./_data/subscribers.json'),
    contributionsByDay: require('./_data/contributions.json').reduce((acc,curr) => {
      if (!acc.firstNotEmptySeen && curr.count > 0) acc.firstNotEmptySeen = true
      if (acc.firstNotEmptySeen) acc.contributions.push(curr)
      return acc
    }, { contributions: [], firstNotEmptySeen: false }).contributions,
    contributionsByYear: require('./_data/years.json'),
    pocketItems: require('./_data/pocket.json').items,
  },

  nunjucksFilters: [{
    name: 'cssmin',
    filter: (code) => {
      const hash = createHash(code)
      if (cache.has(hash)) return cache.get(hash)
      const styles = new CleanCSS({}).minify(code).styles
      cache.set(hash, styles)
      return styles
    }
  }, {
    name: 'words',
    filter: (content) => (content || '').split(' ').length
  }, {
    name: 'mainTag',
    filter: (tags) => tags.filter(t => !['post', 'featured'].includes(t))[0]
  }, {
    name: 'year',
    filter: () => year
  }, {
		name: 'commit',
		filter: ()  => commit
  }, {
		name: 'githubCommitDiffUrl',
    filter: () => `https://github.com/christian-fei/christian-fei.github.io/commit/${commit}`
  }, {
    name: 'readingTime',
    filter: (content) => {
      const words = (content || '').split(' ').length
      const averageWPM = 250
      const readingTimeInMinutes  = words / averageWPM * 2
      const minutes = parseInt(readingTimeInMinutes, 10)
      return minutes > 1 ? `${minutes} minutes` : `1 minute`
    }
  }, {
    name: 'excerpt',
    filter: (content) => (content || '')
      .split('\n')
      .filter((line) => !line.includes('{%'))
      .reduce((acc, line) => {
        if (!line) return acc
        if (line.startsWith('<script')) return Object.assign(acc, {deleting: true})
        if (acc.deleting) return acc
        if (line.startsWith('</script')) return Object.assign(acc, {deleting: false})
        acc.lines.push(line.replace(/\*.*/gi, '').replace(/<\/?[^>]+(>|$)/g, ""))
        return acc
      }, {lines: [], deleting: false}).lines
      .join(' ')
      .split('.')
      .filter((_, i) => i < 5)
      .join(' ')
      .trim()
  }, {
    name: 'twitterTitle',
    filter: (title) => `"${encodeURIComponent(title || '')}", by @christian_fei`
  }, {
    name: 'dehtml',
    filter: (text) => (text || '').replace(/<\/?[^>]+(>|$)/g, "")
  }, {
    name: 'twitterText',
    filter: (post) => `${encodeURIComponent(`"${post.data.title}", by @christian_fei ${post.attributes.tags.filter(t=> !['general', 'post', 'featured', 'draft'].includes(t)).filter((_, i) => i < 2).map(t => `#${t}`).join(' ')}`)}`
  }, {
    name: 'encode',
    filter: (content) => encodeURIComponent(content || '')
  }, {
    name: 'withDomain',
    filter: (url) => (url && url.startsWith('/')) ? `https://cri.dev${url}` : url
  }, {
    name: 'decode',
    filter: (str) => {
      return decodeURIComponent(str)
    }
  }, {
    name: 'limit10',
    filter: (arr) =>  {
      return (Array.isArray(arr) ? arr : []).filter((_, i) => i < 10)
    }
  }, {
    name: 'limit5',
    filter: (arr) =>  {
      return (Array.isArray(arr) ? arr : []).filter((_, i) => i < 5)
    }
  }, {
    name: 'limit15',
    filter: (arr) =>  {
      return (Array.isArray(arr) ? arr : []).filter((_, i) => i < 15)
    }
  }, {
    name: 'limit20',
    filter: (arr) =>  {
      return (Array.isArray(arr) ? arr : []).filter((_, i) => i < 20)
    }
  }, {
    name: 'limit500',
    filter: (arr) =>  {
      return (Array.isArray(arr) ? arr : []).filter((_, i) => i < 500)
    }
  }, {
    name: 'json',
    filter: (obj) => {
      try {
        // console.log('json -> ', obj)
        return JSON.stringify(obj || {}, null, 2)
      } catch (err) {
        console.error(err.message, obj)
        return obj
      }
    }
  }, {
    name: 'utcdate',
    filter: (date) => {
      try {
        return new Date(date).toUTCString()
      } catch (err) {
        return date
      }
    }
  }, {
    name: 'isodate',
    filter: (date) => {
      try {
        return new Date(date).toISOString()
      } catch (err) {
        return date
      }
    }
  }, {
    name: 'today',
    filter: () => today
  }, {
    name: 'isoday',
    filter: (date) => {
      try {
        return new Date(date).toISOString().substring(0, 10)
      } catch (err) {
        return date
      }
    }
	}],
}
