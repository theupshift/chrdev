const CleanCSS = require("clean-css")
const [commitLong, date, ...commitDescription] = require('child_process')
  .execSync(`git log -1 --no-color`)
  .toString()
  .split('\n')
  .filter(Boolean)
  .map(l => l.trim())
  .filter(l => !l.startsWith('Author:'))
const commit = commitLong.replace(/^commit /, '').substring(0, 7)

module.exports = {
  ignoredFiles: ['secrets', 'secrets.example', 'scripts/*'],

  collections: {
    books: require('./_data/books.json'),
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
    filter: (code) => new CleanCSS({}).minify(code).styles
  }, {
    name: 'words',
    filter: (content) => (content || '').split(' ').length
  }, {
    name: 'prepareTags',
    filter: (tags) => tags.filter(t => !['post', 'featured'].includes(t))
  }, {
    name: 'year',
    filter: () => new Date().getFullYear()
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
      .split('.')
      .filter((_, i) => i < 2)
      .join(' ')
      .replace(/<\/?[^>]+(>|$)/g, "")
  }, {
    name: 'twitterTitle',
    filter: (title) => `"${encodeURIComponent(title || '')}", by @christian_fei`
  }, {
    name: 'encode',
    filter: (content) => encodeURIComponent(content || '')
  }, {
    name: 'decode',
    filter: (str) => {
      return decodeURIComponent(str)
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
    name: 'printdate',
    filter: (date) => {
      try {
        return new Date(date).toISOString().substring(0, 10)
      } catch (err) {
        return date
      }
    }
  }, {
    name: 'isoday',
    filter: (date) => {
      try {
        return new Date(date).toISOString().substring(0, 10)
      } catch (err) {
        return date
b      }
    }
	}],
}
