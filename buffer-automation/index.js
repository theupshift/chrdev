const puppeteer = require('puppeteer')
const parseFrontMatter = require('front-matter')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const addToQueue = require('./add-to-queue')
const login = require('./login')

;(async () => {
  console.log('creating browser')
  const browser = await puppeteer.launch({ headless: process.env.HEADLESS !== 'false', timeout: 0 })
  console.log('creating page')
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  const filenames = fs.readdirSync(path.resolve(process.cwd(), 'posts')).filter(f => f.endsWith('.md'))
  const files = filenames.map(f => `${process.cwd()}/posts/${f}`)
  console.log('files', files.length, files[0])
  const attributes = await Promise.all(files.map(f => fsp.readFile(f, { encoding: 'utf8' }).then(f => parseFrontMatter(f).attributes)))
  let toShare = filenames.reduce((acc, filename, i) => {
    const attr = attributes[i]
    if (attr && Array.isArray(attr.tags) && attr.tags.includes('featured')) {
      return acc.concat([`"${attr.title}", by @christian_fei https://christianfei.com/posts/${filename.replace(/\.md$/, '/')} `])
    }
    return acc
  }, []).reverse()
  // toShare.length = 10
  toShare = toShare.slice(10, 20)
  console.log('toShare', toShare.length)

  await login(page)

  for (const shareText of toShare) {
    await addToQueue(page, shareText)
  }

  await browser.close()
})()
