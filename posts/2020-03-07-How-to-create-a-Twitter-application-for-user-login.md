---
title: How to create a Twitter application for user login
date: 2020-03-07
layout: post.njk
tags:
  - post
  - tutorial
  - nodejs
  - javascript
  - twitter
  - oauth
---

## Create a Twitter application

First things first, you'll need to create a *Twitter application*, that contains the **needed api tokens and secrets**.

Follow these **6 steps**:

1. Visit [Twitter Developer Portal](https://developer.twitter.com/), login and select **Apps** from the menu:


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

Now you have everything you need to [authenticate through the Twitter API with Node.js](/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/)!