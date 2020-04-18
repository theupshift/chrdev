const puppeteer = require('puppeteer')
const addToQueue = require('./add-to-queue')
const login = require('./login')

;(async () => {
  const browser = await puppeteer.launch({ headless: process.env.HEADLESS !== 'false', timeout: 0 })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  await login(page)

  await addToQueue(page, '"Boring software development", by @christian_fei https://christianfei.com/posts/2020-04-05-Boring-software-development/ ')

  await browser.close()
})()
