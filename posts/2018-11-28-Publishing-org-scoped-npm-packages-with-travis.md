---
title: Publishing org scoped npm packages with travis
layout: post.njk
tags:
  - post
  - js
  - tutorial
  - featured
date: 2018-11-28
image: https://images.unsplash.com/photo-1512908593802-fc940f380825?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80
---

If you stumbled upon this article, you are probably seeing the following error message on travis in the deployment stage:

<pre>
Deploying application
npm ERR! publish Failed PUT 402
npm ERR! code E402
npm ERR! You must sign up for private packages : @christian_fei/pocket-sync
</pre>

Btw, this is the `.travis.yml` configuraiton:

<pre>
language: node_js
node_js:
  - "10"
script:
  - echo "deploying to npm"
deploy:
  provider: npm
  email: crifei93@gmail.com
  api_key: $NPM_TOKEN
  on:
    tags: true
</pre>

---

To fix it, open your `package.json` and add the following configuration:

<pre>
"publishConfig": {
  "access": "public"
},
</pre>
