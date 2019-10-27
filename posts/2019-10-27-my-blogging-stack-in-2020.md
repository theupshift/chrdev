---
title: my blogging stack in 2020
layout: post.njk
date: 2019-10-27
tags:
  - post
  - js
  - general
---

## tldr;

- pandoc 👉 11ty (static site generator)
- cypress (uat)
- github actions (cd)
- aws s3 (hosting)
- cloudflare (dns + cdn + ssl)

# 11ty

[Eleventy is a simpler static site generator.](https://www.11ty.io).

to bring the point home, i don't even have `@11ty/eleventy` npm package in my [package.json](https://github.com/christian-fei/christian-fei.github.io/blob/master/package.json). i can use `npx` to serve and build my site.

# development

this was important to me, since i didn't want to have to deal with `pandoc`, `haskell` and `latex` to build my site ever again.

i learned from my mistakes and decided to go with something that i was familiar with: `javascript`.

so the most natural thing was to run `npx @11ty/eleventy --serve`. and this is how my site is available and live-reloaded at `http://localhost:8080`.

# eleventy

i have a custom [eleventy configuration](https://github.com/christian-fei/christian-fei.github.io/blob/master/.eleventy.js) with a few additional features and build steps:

- copy assets
- robots.txt
- create excerpts
- prepare posts
- minify html
- minify css
- add build commit to html footer

# uat

cypress is now my choice when it comes to user acceptance tests.

in the [`cypress/integration`](https://github.com/christian-fei/christian-fei.github.io/tree/master/cypress/integration) you can find the following tests:

- content.spec.js
- navigation.spec.js

in runs on the ci with `npx cypress run`, alongside a running http server listening on port `http://localhost:8080`.

# deployment

similar as above, i use `npx @11ty/eleventy` to build this site to the static directory `_site`.

`aws s3 cp` follows and updates my aws s3 bucket with the new static files.

finally, [cloudflare's](https://www.cloudflare.com) http api comes in handy to purge the cdn.

# automation

an absolutely refreshing idea is to have a [pretty stable](https://github.com/christian-fei/christian-fei.github.io/actions) ci/cd pipeline running quite easily.

i have written in another post how i [deploy my site with github actions](https://christianfei.com/posts/2019-08-29-Deploy-Eleventy-site-with-Github-Actions-on-AWS-S3/)

what i delegate to github actions are the following commands:

- build (eleventy)
- uat (cypress)
- deploy (aws s3)
- cache (cloudflare)
- notify (telegram)

each of these lego pieces make the full cd pipeline.

# conclusion

i simply love this setup.

11ty gives me great flexibility, similar to jekyll and conceptually the same.
i will always love jekyll, it was the static site generator that got me into blogging in the first place.

give 11ty a try, a let me know on twitter [@christian_fei](https://twitter.com/christian_fei) what you think about it and if you have any suggestions!