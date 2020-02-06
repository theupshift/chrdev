---
title: Run Cypress Integration Tests with GitHub Actions Workflow
date: 2019-08-31
layout: post.njk
tags:
  - post
  - javascript
  - tutorial
  - featured
image: https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

On this very site this deployment strategy is used with GitHub actions:

```
      - name: uat
        run: |
          npm start &
          npx cypress run
```

As you can see, I just start the development server anad then run the `cypress` tests with `npx`.

Easy as that. If you want to take a closer look at the workflow, check [this out](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml)

![ffmpeg-layer.png](/assets/images/posts/cypress-github-actions.png)
