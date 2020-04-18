module.exports = async function (page, shareText) {
  const currentUrl = page.url()
  if (!currentUrl.includes('publish.buffer.com')) {
    console.log('navigating to publish.buffer.com')
    await page.goto('https://publish.buffer.com/')
  }

  console.log('waiting for share button')
  await page.waitForSelector('[class*="ContentStyle"] button:not([type="secondary"])')
  console.log('clicking on share button')
  await page.click('[class*="ContentStyle"] button:not([type="secondary"])')

  await page.waitForSelector('[contenteditable="true"]')
  console.log('waiting for text input')

  await page.focus('[contenteditable="true"]')

  console.log('typing message', '\n\n', `"${shareText}"`)
  await page.type('[contenteditable="true"]', shareText)
  console.log('finished typing message')

  await page.waitFor(5000)
  await page.waitForSelector('[class*="SuggestedMediaBox__thumbnailContainer"]:first-child').catch(Function.prototype)

  const hasSuggestedMedia = await page.evaluate(() => !!document.querySelector('[class*="SuggestedMediaBox__thumbnailContainer"]:first-child'))
  if (hasSuggestedMedia) {
    console.log('found media suggestions')
    await page.evaluate(selector => {
      document.querySelector(selector).click()
    }, '[class*="SuggestedMediaBox__thumbnailContainer"]:first-child')
  } else {
    console.log('no media suggestions')
  }

  await page.click('[class*="UpdateSaver"] button[class*="BaseButton"]:not([class*="dropdownMenuItem"])')
  console.log('clicked on "Add to queue" button')
}
