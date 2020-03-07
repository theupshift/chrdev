---
title: Twitter OAuth Login with fastify and Node.js
date: 2020-03-07
tags:
  - draft
---

## GitHub example repo

At [christian-fei/twitter-oauth-login-in-nodejs](https://github.com/christian-fei/twitter-oauth-login-in-nodejs) on GitHub you can find the **whole source code**.

## OAuth utilities

To authenticate through the Twitter API I found the following set of **OAuth utilities** pretty useful.

This is the file `oauth-utilities.js`:

```javascript
const oauth = require('oauth')

const { promisify } = require('util')

const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.TWITTER_CONSUMER_API_SECRET_KEY

const oauthConsumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  '1.0A', 'http://127.0.0.1:3000/twitter/callback', 'HMAC-SHA1')

module.exports = {
  oauthGetUserById,
  getOAuthAccessTokenWith,
  getOAuthRequestToken
}

async function oauthGetUserById (userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    .then(body => JSON.parse(body))
}
async function getOAuthAccessTokenWith ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth access token'))
        : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
    })
  })
}
async function getOAuthRequestToken () {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth request token'))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
    })
  })
}
```

## fastify HTTP server

First import the following modules, `fastify`, `fastify-session` and `fastify-cookie` (`npm install` them):

```javascript
const fastify = require('fastify')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')

const {
  getOAuthRequestToken,
  getOAuthAccessTokenWith,
  oauthGetUserById
} = require('./oauth-utilities')

const path = require('path')
const fs = require('fs')
```

## HTML files

An `index.js` file which invites the user to login, and a `template.html` file that renders the logged in user's screen name.

Read them from the file system:

```javascript
const INDEX = fs.readFileSync(path.resolve(__dirname, 'client', 'index.html'), { encoding: 'utf8' })
const TEMPLATE = fs.readFileSync(path.resolve(__dirname, 'client', 'template.html'), { encoding: 'utf8' })
```

## Session secret

Generate a session secret, longer than 32 character, and set it as environment variable or in your `.npmrc`:

```javascript
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
```

## The `main` program

This runs the main program:

```javascript
main()
  .catch(err => console.error(err.message, err))
```

Create a fastify instance:

```javascript
async function main () {
  const app = fastify({ logger: true })

...
```

Register the plugins for handling user sessions and cookies:

```javascript
  app.register(fastifyCookie)
  app.register(fastifySession, {
    cookieName: 'sessionId',
    secret: COOKIE_SECRET || 'secretsecretsecretsecretsecretsecretsecret',
    cookie: { secure: false },
    expires: 900000
  })
```

## html pages

Register the `/` route, for logged in users the username will be shown with the logout button. For all other users, the `INDEX` page with login buttons.

```javascript
  app.get('/', {
    handler (request, reply) {
      reply.type('text/html')

      console.log('/ request.cookies', request.cookies)
      if (request.cookies && request.cookies.twitter_screen_name) {
        console.log('/ authorized', request.cookies.twitter_screen_name)
        return reply.send(TEMPLATE.replace('CONTENT', `
          <h1>Hello ${request.cookies.twitter_screen_name}</h1>
          <br>
          <a href="/twitter/logout">logout</a>
        `))
      }

      reply.send(INDEX)
    }
  })
```

## User logout

The users needs to be able to logout, so you need to register a `/twitter/logout` route that clears the cookie and redirects to `/`:

```javascript
  app.get('/twitter/logout', logout)
  function logout (request, reply) {
    reply.clearCookie('twitter_screen_name', { path: '/' })
    reply.redirect('/')
  }
```

## Initiate OAuth flow

The user clicks on the login button which points to either `/twitter/authenticate` or `/twitter/authorize`, dependending on the fact if the user has previously authorized the Twitter application or not:

```javascript
  app.get('/twitter/authenticate', twitter('authenticate'))
  app.get('/twitter/authorize', twitter('authorize'))
  function twitter (method = 'authorize') {
    return async (request, reply) => {
      console.log(`/twitter/${method}`)
      const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
      console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

      request.session.oauthRequestToken = oauthRequestToken
      request.session.oauthRequestTokenSecret = oauthRequestTokenSecret

      const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
      console.log('redirecting user to ', authorizationUrl)
      reply.redirect(authorizationUrl)
    }
  }
```

## Completing the OAuth flow

After the user clicks on the `Authorize` button on the **Twitter OAuth Consent Screen**, they are redirected to the **Callback URL** set as `http://127.0.0.1:3000/twitter/callback`.

This finally sets the user session and a cookie with the `twitter_screen_name` ([`@christian_fei`](https://twitter.com/christian_fei) for example):

```javascript
  app.get('/twitter/callback', async (request, reply) => {
    const { oauthRequestToken, oauthRequestTokenSecret } = request.session
    console.log('request.session', { oauthRequestToken, oauthRequestTokenSecret })
    console.log('request.query', request.query)
    const { oauth_verifier: oauthVerifier } = request.query
    console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    request.session.oauthAccessToken = oauthAccessToken

    const { user_id: userId /*, screen_name */ } = results
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

    request.session.twitter_screen_name = user.screen_name
    reply
      .setCookie('twitter_screen_name', user.screen_name, {
        domain: '127.0.0.1',
        path: '/',
        secure: false
      })

    console.log('user succesfully logged in with twitter', user.screen_name)
    reply.redirect('/')
  })
```

## Start the server

The server will listen on the port `3000` and print the HTTP address `http://127.0.0.1:3000` for easy access (click on it if you're using iTerm)


```javascript
  try {
    await app.listen(3000)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
```


## GitHub repo

At [christian-fei/twitter-oauth-login-in-nodejs](https://github.com/christian-fei/twitter-oauth-login-in-nodejs) on GitHub you can find the **whole source code**.

---

Let me know on [Twitter @christian_fei](https://twitter.com/christian_fei) if you found it useful or something is not clear!