---
title: Validate your RSS feed
date: 2020-05-07
layout: post.njk
tags:
  - post
  - featured
  - rss
  - testing
  - CI
  - blogging
image: https://images.unsplash.com/photo-1559526324-c1f275fbfa32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

Today a [dear user](https://twitter.com/simevidas/status/1258409638611038213) made me aware that my RSS feed broke. There was a **XML Parsing Error** for [cri.dev/rss.xml](/rss.xml).

ASAP after work I checked the validity through [validator.w3.org/feed/](https://validator.w3.org/feed/) and in fact there were some issues with it.

Apparently a **mismatched tag** `</link>` was causing the parser to go berserk.

![w3-feed-validator.png](/assets/images/posts/w3-feed-validator.png)
After understanding the issue, I simplified the `rss.md` (which generates the [`rss.xml`](https://github.com/christian-fei/christian-fei.github.io/blob/master/rss.md) through [devblog](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/)) and used [scripting.com/rss.xml](http://scripting.com/rss.xml) as an example.

Stripped away all the tags I didn't need, and this is the resulting version of [`rss.md`](https://github.com/christian-fei/christian-fei.github.io/blob/master/rss.md):

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Christian Fei's Blog</title>
  <link><![CDATA[https://cri.dev]]></link>
  <description>A blog about my programming adventures in Elixir, Node.js and JavaScript</description>
  {%- for post in collections.post | reverse %}
  <item>
    <title><![CDATA[{{ post.data.title }}]]></title>
    <link><![CDATA[{{ post.url | withDomain }}]]></link>
    <guid><![CDATA[{{ post.url | withDomain }}]]></guid>
    <description><![CDATA[{{ post.text }}]]></description>
  </item>
  {%- endfor %}
</channel>
</rss>
```

This file is processed with [devblog](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/) and **loops through the collections of posts**, creating a list of `<item>` elements that represent the RSS feed.

The `reverse` nunjucks filter is needed because files are listed in alphabetical order, which means I would have the *oldest* post first otherwise.

## Validating the RSS feed in the CI

I wanted to add this build step in the Continuous Integration I have set up with a GitHub Actions workflow.

> If the validation of the RSS feed fails, the CI **should not deploy a new version** of the blog to [cri.dev](/)

Looking on NPM I found this little gem (pun intended) called [`feed-validator`](https://www.npmjs.com/package/feed-validator).

Which I use in my [GitHub Actions workflow's main.yml](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml) in the following way:

```yml
...
      - name: build
        run: |
          npm run build
          npm run compress
      - name: start server
        run: |
           npm start &
      - name: rss validation
        run: |
          npx feed-validator  http://127.0.0.1:8080/rss.xml
      - name: uat
        uses: cypress-io/github-action@v1
      - name: deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          npm run deploy-with-assets
...
```

You could also run it via file with the `[-c FILE_PATH]` option.

This small module calls the **validation endpoint on validator.w3.org** for me. In other words, this could be done with a `cURL` call, but that's for another time.

[Here the code](https://github.com/andre487/feed-validator/blob/master/providers/feed-validator.js#L43) that does the API call to validator.w3.org.
---

Here's the full [rss.xml feed](/rss.xml), if you're into that.

PS: did you remember that RSS was initially called **RDF Site Summary**, and then **Really Simple Syndication** or **Rich Site Summary**? ~ [Wikipedia](https://en.wikipedia.org/wiki/RSS)
