module.exports = async function (page, shareText) {
  console.log('📖  add to queue')

  console.log('navigating to publish.buffer.com')
  await page.goto('https://publish.buffer.com/')

  if (process.env.LINKEDIN === 'true') {
    console.log('choosing linkedin')
    await page.waitForSelector('[class*="ProfileListItem__ListItemContainer"] li', { timeout: 15000 })
    await page.evaluate(() => {
      const el = [...document.querySelectorAll('[class*="ProfileListItem__ListItemContainer"] li')][1]
      el && el.click()
    })
  }

  console.log('waiting for share button')
  await page.waitForSelector('[class*="ContentStyle"] button:not([type="secondary"]):not([aria-haspopup="false"])')
  console.log('clicking on share button')
  await page.click('[class*="ContentStyle"] button:not([type="secondary"]):not([aria-haspopup="false"])')

  await page.waitForSelector('[contenteditable="true"]')
  console.log('waiting for text input')

  await page.focus('[contenteditable="true"]')

  console.log('typing message', '\n\n', `"${shareText}"`)
  await page.type('[contenteditable="true"]', shareText)
  await page.type('[contenteditable="true"]', ' ')
  console.log('finished typing message')

  await page.click('[class*="UpdateSaver"] button[class*="BaseButton"]:not([class*="dropdownMenuItem"])')
  console.log('clicked on "Add to queue" button')
}
