---
title: Deploy Eleventy site with Github Actions on AWS S3
date: 2019-08-29
layout: post.njk
tags:
  - post
  - js
  - tut
---

![gh-actions-working.png](/assets/images/posts/eleventy-github-actions-aws/gh-actions-working.png)

I [finally managed](https://twitter.com/christian_fei/status/1167164272096550912) to get the deployment of an [eleventy - 11ty](https://www.11ty.io) site ([namely this one](https://github.com/christian-fei/christian-fei.github.io)) and sync with AWS S3, where this blog is hosted.

Additionally you can put in a small script that purges [cloudflare's](https://www.cloudflare.com) cache too.


## Setting up the Github Actions workflow

create a file in your repository under [`.github/workflows/main.yml`](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml), with the following contents:

```
name: name this build as you like
on: [push]
jobs:
  build_deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@master
      - name: up
        env:
          AWS_ACCESS_KEY_ID: {% raw %}${{ secrets.AWS_ACCESS_KEY_ID }}{% endraw %}
          AWS_SECRET_ACCESS_KEY: {% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }}{% endraw %}
        run: |
          npx @11ty/eleventy
          aws s3 cp \
            --recursive \
            --acl public-read \
            --region eu-central-1 \ # change it
            ./_site/ [s3://bucket_name] # change it
```

### secrets

additionally set two **Secrets** in the repository settings on GitHub:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

![gh-actions-github-secrets.png](/assets/images/posts/eleventy-github-actions-aws/gh-actions-github-secrets.png)

Now you should be all set, and your eleventy blog gets deployed to AWS with GitHub Actions on every push.


## update

this blog post was deployed with this exact workflow, so meta

![gh-actions-deploy-blog-post.png](/assets/images/posts/eleventy-github-actions-aws/gh-actions-deploy-blog-post.png)

---

A few highlights of the workflow:

![gh-actions-build-deploy.png](/assets/images/posts/eleventy-github-actions-aws/gh-actions-build-deploy.png)

![gh-actions-cloudflare-purge-cache.png](/assets/images/posts/eleventy-github-actions-aws/gh-actions-cloudflare-purge-cache.png)
