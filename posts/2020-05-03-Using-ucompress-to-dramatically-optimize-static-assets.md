---
title: Using µcompress to dramatically optimize static assets
date: 2020-05-03
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - blogging
image: https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

[`µcompress`](https://github.com/WebReflection/ucompress) is a lovely utility by [WebReflection](https://twitter.com/WebReflection) that compresses common static files.

> A micro, all-in-one, compressor for common Web files

Using it since [commit ce0a9e](https://github.com/christian-fei/christian-fei.github.io/commit/ce0a9e6d300969b2c79a029a8d69ecd6c71c054f) on this very website, in my [GitHub Actions workflow](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml).

---

## 10MB overall save

Here **some stats** about the dramatic change it had on the **static assets**:

```
~/D/p/c/_site (master ↩) du -sh .
 44M	.
~/D/p/c/_site (master ↩) ucompress --source ./ --dest ./
~/D/p/c/_site (master ↩) du -sh .
 34M	.
```

It *compresses* the following assets (taken from the README):

- **css** files via [csso](https://www.npmjs.com/package/csso)
- **gif** files via [gifsicle](https://www.npmjs.com/package/gifsicle)
- **html** files via [html-minifier](https://www.npmjs.com/package/html-minifier)
- **jpg** or **jpeg** files via [jpegtran-bin](https://www.npmjs.com/package/jpegtran-bin)
- **js** files via [uglify-es](https://www.npmjs.com/package/uglify-es)
- **png** files via [pngquant-bin](https://www.npmjs.com/package/pngquant-bin)
- **svg** files via [svgo](https://www.npmjs.com/package/svgo)
- **xml** files via [html-minifier](https://www.npmjs.com/package/html-minifier)


As you can see, I managed to save **~10MB** on my `_site` folder, built with [devblog](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously/). **That's huge**.

![10MB](/assets/images/posts/ucompress/10MB.png)

## Pagespeed says thanks

Previously, I manually optimized *images* with `convert` and `mogrify` (from the `imagemagick` family). Through [Cloudflare](https://www.cloudflare.com/), the assets where compressed and optimized.

That was it.

And I already had a [**pretty decent score on pagespeed insights**](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcri.dev%2F&tab=desktop):

![score-100](/assets/images/posts/ucompress/score-100.png)
![score](/assets/images/posts/ucompress/score.png)

## Optimized assets

This were the assets loaded for the homepage of [cri.dev](https://cri.dev):

![assets-before](/assets/images/posts/ucompress/assets-before.png)

And after using `ucompress`:

![assets-after](/assets/images/posts/ucompress/assets-after.png)

I have around **400+ compiled assets** (using [`devblog`](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously)) and **~150 images** for this blog.

```sh
~/D/p/c/_site (master ↩) find . -type f | wc -l
     417
~/D/p/c/_site (master ↩) find . -type f | grep images | wc -l
     147
```

Using `ucompress` saves me a bit of time when **synching the assets** from the `_site` folder to my **S3 bucket** and the overhead of **running it on the CI is negligible**.

## Use it!

There are no excuses to optimize your static files now.

```sh
npx ucompress --help

# or install globally

npm i -g ucompress
```

I am using it this way on my GitHub Actions workflow:

- first i build the blog with [devblog](/posts/2020-04-19-devblog-yet-another-static-site-generator-seriously)
- optimize the assets with `npx ucompress --source ./_site --dest ./_site` (see the [`main.yml` workflow file](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml#L16))
- run UAT with cypress
- sync S3 bucket
- optionally clear cloudflare cache
- send myself a telegram message once done

[Go ahead, copy it.](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml)

---

Thank you [@WebReflection](https://twitter.com/WebReflection) for [`ucompress`](https://github.com/WebReflection/ucompress) ✌️
