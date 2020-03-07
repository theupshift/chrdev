---
title: Twitter OAuth Login by example with Node.js
date: 2020-03-05
layout: post.njk
tags:
  - post
  - tutorial
  - nodejs
  - javascript
  - twitter
  - oauth
  - featured
image: https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Lately I found myself dealing with Twitter and Google OAuth (1.0a and 2.0) to authorize a user to act on their behalf, namely reading profile information, reading and posting content on their behalf or other common permissions.

Since my process of *trying to understand* and make sense of OAuth has been both fun and rough, I wanted to **summarize a full example in a single JavaScript file** and document other findings along the way.

![](/assets/images/posts/twitter-oauth/authorize.png)

## Documentation, documentation, documentation
If you want to **read extensively** the documentation and deeply understand the flow, these are some links that helped me out greatly:

- [Authentication Methods](https://developer.twitter.com/en/docs/basics/authentication/overview)
- [Implementing Log in with Twitter](https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter)
- [Obtaining user access tokens using 3-legged OAuth](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a/obtaining-user-access-tokens)
- [/oauth/authenticate](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authenticate)
- [/oauth/authorize](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authorize)

## Requirements
**To have a fully working HTTP server working together with Twitter OAuth in Node.js you need**

- an application created on [developer.twitter.com](https://developer.twitter.com/) to be used **to sign in with Twitter**
- a **Consumer API key and secret** for the OAuth part
- an HTTP server
- some lightweight Node.js modules

Read below for a step by step guide!

## Twitter application for OAuth
1. Visit [Twitter Developer Portal](https://developer.twitter.com/), login and select **Apps** from the menu:

![](/assets/images/posts/twitter-oauth/0-apps.png)

2. Create a new app

![](/assets/images/posts/twitter-oauth/1-create-an-app.png)

3. Give it a name and description

![](/assets/images/posts/twitter-oauth/app-name.png)

4. **Important**: Select **Enable Sign in with Twitter** and add the following url to the list of **Callback URLs**:

`http://127.0.0.1:3000/twitter/callback`

![](/assets/images/posts/twitter-oauth/app-callback.png)

5. In your **app settings**,  head over to **Keys and Tokens**

![](/assets/images/posts/twitter-oauth/2-keys-and-tokens.png)

6. Get your **Consumer API key** and **Consumer API secret key** and *copy them to your clipboard*, you’ll need them in the code

![](/assets/images/posts/twitter-oauth/keys.png)


## Dependencies
Using **express** as an example here, though you can use any other framework, the concept is the same.

We need **4 useful modules** from *npm*:

- `oauth` for generating the request and access tokens for the OAuth flow, and for authenticating to any OAuth enable HTTP API (like Twitter)
- `express` as the web server
- `express-session` , `cookie-parser` for handling the user sessions and cookies

## The HTTP server and endpoints
The local HTTP server will listen on the port **3000** and serves the following routes:

- GET */* as the simplest possible authentication HTML page
- GET */twitter/authenticate* and */twitter/authorize* for the OAuth flow initiation
- GET */twitter/callback* to get the authorized **user access token and secret**
- GET */twitter/logout* to enable the user to log out from the application

To handle sessions and parse HTTP cookies `express-session`  and  `cookie-parser` are used.

This is how it looks like

![](/assets/images/posts/twitter-oauth/login.png)
![](/assets/images/posts/twitter-oauth/logged-in.png)


## The code
[The full source code can be found on GitHub](https://github.com/christian-fei/twitter-oauth-login-in-nodejs).

Learn how to [make authenticated API calls with OAuth 1.0a and 2.0](/posts/2020-02-15-Twitter-OAuth-by-example-in-Nodejs/).

<iframe src="https://slides.com/christianfei/darklang/embed?style=light" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Step-by-step
Let’s import the relevant modules:

```javascript
const oauth = require(‘oauth’)
const express = require(‘express’)
const session = require(‘express-session’)
const cookieParser = require(‘cookie-parser’)

const path = require(‘path’)
const fs = require(‘fs’)
const { promisify } = require(‘util’)
```

Set the environment variables, either loaded via Environment variables set during the execution, or dynamically loaded by npm via `.npmrc`

```javascript
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.TWITTER_CONSUMER_API_SECRET_KEY
```

The very simple HTTP server “dynamically“ renders an HTML page based on the signed in Twitter user, greeting them with their username:

```javascript
const TEMPLATE = fs.readFileSync(path.resolve(__dirname, 'client', 'template.html'), { encoding: 'utf8' })
```

We need to create an **OAuth Consumer** to generate the request, access token and make authorised requests to the Twitter API:

```javascript
const oauthConsumer = new oauth.OAuth(
  ‘https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token’,
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  ‘1.0A’, ‘http://127.0.0.1:3000/twitter/callback', 'HMAC-SHA1’)
```

Let’s run the **main program**!

```javascript
main()
  .catch(err => console.error(err.message, err))
```

The initial part of the main function, **setting up the HTTP server**:

```javascript
async function main () {
  const app = express()
  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || ‘secret’ }))

  app.listen(3000, () => console.log(‘listening on http://127.0.0.1:3000'))

…
```

Add a route to handle the “dynamic” page contains the logged in user’s twitter handle:

```javascript
…

  app.get(‘/‘, async (*req*, *res*, *next*) => {
    console.log(‘/ req.cookies’, req.cookies)
    if (req.cookies && req.cookies.twitter_screen_name) {
      console.log(‘/ authorized’, req.cookies.twitter_screen_name)
      return res.send(TEMPLATE.replace(‘CONTENT’, `
        <h1>Hello ${req.cookies.twitter_screen_name}</h1>
        <br>
        <a href=“/twitter/logout”>logout</a>
      `))
    }
    return next()
  })

…
```

Fallback to a static HTML page `index.html` that has the login buttons, both for `authorisation` and `authentication`.
You can read more about [authorization](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authorize) and [authentication](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authenticate) on the official documentation.

```javascript
…

  app.use(express.static(path.resolve(__dirname, ‘client’)))

…
```

Set up routes for `/twitter/logout`, `/twitter/authorize` and `/twitter/authenticate`:

```javascript
…

  app.get(‘/twitter/logout’, logout)
  function logout (req, res, next) {
    res.clearCookie(‘twitter_screen_name’)
    req.session.destroy(() => res.redirect(‘/‘))
  }

  app.get(‘/twitter/authenticate’, twitter(‘authenticate’))
  app.get(‘/twitter/authorize’, twitter(‘authorize’))
  function twitter (*method* = ‘authorize’) {
    return async (*req*, *res*) => {
      console.log(`/twitter/${method}`)
      const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
      console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

      req.session = req.session || {}
      req.session.oauthRequestToken = oauthRequestToken
      req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

      const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
      console.log(‘redirecting user to ‘, authorizationUrl)
      res.redirect(authorizationUrl)
    }
  }

…
```

Finally the last route, namely `/twitter/callback`, which **completes the OAuth flow**!:

```javascript
…

  app.get(‘/twitter/callback’, async (*req*, *res*) => {
    const { oauthRequestToken, oauthRequestTokenSecret } = req.session
    const { oauth_verifier: oauthVerifier } = req.query
    console.log(‘/twitter/callback’, { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    req.session.oauthAccessToken = oauthAccessToken

    const { user_id: userId /*, screen_name */ } = results
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

    req.session.twitter_screen_name = user.screen_name
    res.cookie(‘twitter_screen_name’, user.screen_name, { maxAge: 900000, httpOnly: true })

    console.log(‘user succesfully logged in with twitter’, user.screen_name)
    req.session.save(() => res.redirect(‘/‘))
  })

…
```

The remaining methods are used to interact with the Twitter OAuth API:

```javascript
…

async function oauthGetUserById (*userId*, { *oauthAccessToken*, *oauthAccessTokenSecret* } = {}) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    .then(*body* => JSON.parse(body))
}
async function getOAuthAccessTokenWith ({ *oauthRequestToken*, *oauthRequestTokenSecret*, *oauthVerifier* } = {}) {
  return new Promise((*resolve*, *reject*) => {
    oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (*error*, *oauthAccessToken*, *oauthAccessTokenSecret*, *results*) {
      return error
        ? reject(new Error(‘Error getting OAuth access token’))
        : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
    })
  })
}
async function getOAuthRequestToken () {
  return new Promise((*resolve*, *reject*) => {
    oauthConsumer.getOAuthRequestToken(function (*error*, *oauthRequestToken*, *oauthRequestTokenSecret*, *results*) {
      return error
        ? reject(new Error(‘Error getting OAuth request token’))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
    })
  })
}

…
```

## Running the code

As simple as this, you just need to have your `TWITTER_CONSUMER_API_KEY` and `TWITTER_CONSUMER_API_SECRET_KEY` ready:

```bash
TWITTER_CONSUMER_API_KEY=YOUR_KEY
TWITTER_CONSUMER_API_SECRET_KEY=YOUR_SECRET_KEY
  node index.js
```

#### [Here you can find the full source code](https://github.com/christian-fei/twitter-oauth-login-in-nodejs)!

## Wrapping it up
I hope this was helpful, if so, please [let me know on Twitter @christian_fei](https://twitter.com/christian_fei) and spread the word by sharing this article with your dev friends!
