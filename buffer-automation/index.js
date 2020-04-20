const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const addToQueue = require('./add-to-queue')
const login = require('./login')

;(async () => {
  console.log('creating browser')
  const browser = await puppeteer.launch({ headless: process.env.HEADLESS !== 'false', timeout: 0 })
  console.log('creating page')
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  const siteContent = fs.readFileSync(path.resolve(process.cwd(), 'site.json'))
  const site = JSON.parse(siteContent)

  const files = site.files

  const toShare = files.reduce((acc, file, i) => {
    const attr = file.attributes
    if (attr && Array.isArray(attr.tags) && attr.tags.includes('featured')) {
      const tagsString = attr.tags.filter(t => !['post', 'featured', 'general'].includes(t)).map(t => `#${t}`).join(' ')
      return acc.concat([`"${attr.title}", by @christian_fei https://cri.dev${file.url} ${tagsString} `])
    }
    return acc
  }, []).reverse()
  toShare.length = 10
  // toShare = toShare.slice(10, 20)
  console.log('toShare', toShare.length, toShare)

  await login(page)

  for (const shareText of toShare) {
    await addToQueue(page, shareText)
    await page.waitFor(1000)
  }

  await browser.close()
})()
