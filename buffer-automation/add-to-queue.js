module.exports = async function (page, shareText) {
  console.log('📖  add to queue')

  console.log('navigating to publish.buffer.com')
  await page.goto('https://publish.buffer.com/')

  console.log('waiting for share button')
  await page.waitForSelector('[class*="ContentStyle"] button:not([type="secondary"])')
  console.log('clicking on share button')
  await page.click('[class*="ContentStyle"] button:not([type="secondary"])')

  await page.waitForSelector('[contenteditable="true"]')
  console.log('waiting for text input')

  await page.focus('[contenteditable="true"]')

  console.log('typing message', '\n\n', `"${shareText}"`)
  await page.type('[contenteditable="true"]', shareText)
  await page.type('[contenteditable="true"]', ' ')
  console.log('finished typing message')

  console.log('waiting for suggested media')
  await page.waitFor(5000)

  console.log('trying to select suggested media')
  const foundSuggestedMedia = await page.evaluate(selector => {
    const el = document.querySelector(selector)
    if (el && el.click) el.click()
    return !!el
  }, '[class*="SuggestedMediaBox__thumbnailContainer"]:first-child')

  console.log(foundSuggestedMedia ? 'clicked on suggested media' : 'no suggested media found')

  await page.click('[class*="UpdateSaver"] button[class*="BaseButton"]:not([class*="dropdownMenuItem"])')
  console.log('clicked on "Add to queue" button')
}
