---
title: Twitter OAuth by example in Node.js
date: 2020-02-15
layout: post.njk
tags:
  - featured
  - post
  - javascript
  - nodejs
  - tutorial
image: https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

Curious about how to call an HTTP API like Twitter or GitHub by authenticating through OAuth (1.0a and 2.0)?

Read more about how to do it with Node.js

Learn how to [create Twitter login with OAuth 1.0a](/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/).


## About OAuth

There are different ways to authenticate with OAuth on the Twitter platform.

Below you can read a bit more about *OAuth 1.0a* and *OAuth 2.0 Bearer* authentication methods and a step-by-step explanation of the usage in Node.js


#### OAuth 1.0a method

Many endpoints of the Twitter API use the [OAuth 1.0a method](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a) to act, or make API requests, on behalf of a Twitter account.

With a Twitter developer app, you can make requests on behalf of a Twitter account as long as that user authenticated through the Twitter login screen to your app.

#### OAuth 2.0 Bearer Token

[OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0) is the application-only authentication method for authenticating with the Twitter API.

This method doesn't involve any user authentication and is typically used for read-only access to public information on the Twitter API.


# Get the necessary keys

1. Go to [developer.twitter.com/en/apps](https://developer.twitter.com/en/apps), login and click on **Apps** in the upper right menu:

<img loading="lazy" src="/assets/images/posts/twitter-oauth/0-apps.png" alt="twitter apps menu" />

2. Now you need to create an app to authenticate to the Twitter API:

<img loading="lazy" src="/assets/images/posts/twitter-oauth/1-create-an-app.png" alt="create an app" />

3. generate consumer key and secret

In you applications tab you will alredy see you **Consumer API Key** and **Consumer API Secret Key**.

Click on **Generate** to get also the **Access Token** and **Access Token Secret**:

<img loading="lazy" src="/assets/images/posts/twitter-oauth/2-generate-consumer-ks.png" alt="generate-consumer-ks" />

Here is the app overview screen:

<img loading="lazy" src="/assets/images/posts/twitter-oauth/2-apps-overview.png" alt="apps-overview" />

**Now you have everything you need!**



# Node.js example with OAuth 1.0a

When working with OAuth 1.0a you need to get a **request token** and **access token** to authenticate to the Twitter API.

This is where the **npm package** [oauth](https://www.npmjs.com/package/oauth) comes in handy.

You need the following **credentials set as environment variables** when running the below Node.js script:

- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_KEY
- TWITTER_ACCESS_TOKEN_SECRET


Install the dependency `oauth` with npm (`npm install oauth`).

The file `oauth1.js` should look like this and it **gets the profile info of the user with the handle @twitterdev**

```js
#!/usr/bin/env node

const OAuth = require('oauth')
const { promisify } = require('util')

getTwitterUserProfileWithOAuth1('twitterdev')
  .then((profile) => console.log('oauth1 response', JSON.stringify(profile, null, 2)) && process.exit(0))
  .catch(err => console.error(err) && process.exit(1))

async function getTwitterUserProfileWithOAuth1 (username = 'twitterdev') {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1'
  )
  const get = promisify(oauth.get.bind(oauth))

  const body = await get(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
    process.env.TWITTER_ACCESS_KEY,
    process.env.TWITTER_ACCESS_TOKEN_SECRET
  )

  return JSON.parse(body)
}
```


Run `oauth1.js` with node:

```bash
TWITTER_ACCESS_KEY=[YOUR_TWITTER_ACCESS_KEY] \
TWITTER_ACCESS_TOKEN_SECRET=[YOUR_TWITTER_ACCESS_TOKEN_SECRET] \
TWITTER_CONSUMER_KEY=[YOUR_TWITTER_CONSUMER_KEY] \
TWITTER_CONSUMER_SECRET=[YOUR_TWITTER_CONSUMER_SECRET] \
  node oauth1.js
```

PS: the `#!/usr/bin/env node` part is useful if you want to make your Node.js script an **executable** (`chmod +x oauth1.js`)




# Node.js example with OAuth 2.0

With OAuth 2.0 the authentication is even simpler, but more limited on its actions, as you can read above.

You'll need both the `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` to get a **Bearer token** to call the Twitter API.

Here is an example, the file `oauth2.js` should look like this (**it also gets the profile information of the user @twitterdev**)

```js
#!/usr/bin/env node

const OAuth = require('oauth')
const got = require('got')
const { promisify } = require('util')

getTwitterUserProfileWithOAuth2('twitterdev')
  .then((profile) => console.log('oauth2 response', JSON.stringify(profile, null, 2)) && process.exit(0))
  .catch(err => console.error(err) && process.exit(1))


async function getTwitterUserProfileWithOAuth2 (username = 'twitterdev') {
  var oauth2 = new OAuth.OAuth2(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    'https://api.twitter.com/', null, 'oauth2/token', null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

  return got(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((res) => JSON.parse(res.body))
}

```

Run `oauth2.js` with node:

```bash
TWITTER_CONSUMER_KEY=[YOUR_TWITTER_CONSUMER_KEY] \
TWITTER_CONSUMER_SECRET=[YOUR_TWITTER_CONSUMER_SECRET] \
  node oauth2.js
```

In this case the API `/1.1/users/show.json` supports both **OAuth 1.0a** and **OAuth 2.0**.

Some APIs (depending on their scope) will need one or the other, it should be [well documented](https://developer.twitter.com/en/docs).

## Wrapping it up

On the [github repository](https://github.com/christian-fei/twitter-oauth-by-example-in-nodejs.git) you can find the full source code!

Clone it with

```bash
# https
git clone https://github.com/christian-fei/twitter-oauth-by-example-in-nodejs.git

# or ssh
git clone git@github.com:christian-fei/twitter-oauth-by-example-in-nodejs.git
```

Enjoy, and let me know what you think [@christian_fei](https://twitter.com/christian_fei) on Twitter!


---


## sidenote: OAuth2 with `curl`

Getting an **access token** that can be used to authenticate via `Bearer` authentication can be easily achieved with `curl`:

```bash
curl \
  -u '<YOUR_TWITTER_CONSUMER_KEY>:<YOUR_TWITTER_CONSUMER_SECRET>' \
  --data 'grant_type=client_credentials' \
  'https://api.twitter.com/oauth2/token'
```

and the response will look something like this:

```bash
{"token_type":"bearer","access_token":"AAAAAAAAA..."}
```

Now we can authenticate with the `access_token` to the twitter api, using `Bearer` authorization scheme:

```bash
curl --header 'Authorization: Bearer AAAAAAAAA...' 'https://api.twitter.com/1.1/users/show.json?screen_name=christian_fei'
```

returning more information about the twitter user profile `christian_fei`:

```json
{
  "id":128166532,
  "id_str":"128166532",
  "name":"\/christian\/\ud83c\udf55",
  "screen_name":"christian_fei",
  "location":"The Internet"
  ,"profile_location":null,
  "description":"agile person, clean code connoisseur and testing aficionado \ud83d\udc68\u200d\ud83d\udcbb dev @wonderflow",
  "url":"https:\/\/t.co\/qUleUCEuNH",
  "entities":{"url":{"urls":[{"url":"https:\/\/t.co\/qUleUCEuNH",
  "expanded_url":"https:\/\/christianfei.com\/",
  "display_url":"christianfei.com",
  "indices":[0,23]}]},
  "description":{"urls":[]}},
  "protected":false,
  "followers_count":567
  ,"friends_count":133,
  "listed_count":111,
  "created_at":"Wed Mar 31 08:55:25 +0000 2010",
  "statuses_count":12795,
  ...
```

Learn how to [create Twitter login with OAuth 1.0a](/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/).

