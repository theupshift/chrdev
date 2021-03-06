module.exports = async function (page) {
  console.log('👨‍💻  login')
  console.log('navigating to login.buffer.com')
  await page.goto('https://login.buffer.com/login')

  console.log('waiting for login form')
  await page.waitForSelector('#login-form #email')
  await page.click('#login-form #email')

  await page.type('#login-form #email', process.env.BUFFER_EMAIL)
  await page.type('#login-form #password', process.env.BUFFER_PASSWORD)

  await page.click('#login-form-submit')
  await page.waitForNavigation()
  console.log('logging in')
}
