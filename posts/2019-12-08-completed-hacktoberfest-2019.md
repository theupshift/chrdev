---
title: completed hacktoberfest 2019
date: 2019-12-08
layout: post.njk
tags:
  - post
  - general
image: https://images.unsplash.com/photo-1551236015-dc372b14db22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

<!-- ![/assets/images/posts/completed-hacktoberfest-2019/confirmation-email.png](/assets/images/posts/completed-hacktoberfest-2019/confirmation-email.png) -->

this year i participated again in the hacktoberfest, and it's been fun!

i had half a month to actually complete the challenge (to have 4 pull requests merged and approved), since i was on vacation  🌍 🏖.

## contributions

![/assets/images/posts/completed-hacktoberfest-2019/contributions.png](/assets/images/posts/completed-hacktoberfest-2019/contributions.png)

#### [clio-lang](https://github.com/clio-lang/clio/pull/26)

a simple renaming of a method got me this merged.

> i noticed this naming could be improved, as star and transform are two separate names and should be separated by _.

e.g.

```js
-    startransform: function(node) {
+    star_transform: function(node) {
```

#### [problem-solving-javascript](https://github.com/knaxus/problem-solving-javascript/pull/147)

added tests for bottom view binary tree

e.g.

```js
+    const BinaryTree = require("../index");
+    const bottomView = require('.');
+
+    describe('Bottom View Binary Tree', () => {
+      let btree
+
+      beforeEach(() => {
+        btree = new BinaryTree([1, 2, 3, 4, 5, 6]);
+      });
+
+      it('Should determine the bottom view of a binary tree', () => {
+        expect(bottomView(btree)).toEqual([6, 2, 3, 4]);
+      });
+      it('Should handle null binary tree', () => {
+        expect(bottomView(null)).toEqual([]);
+      });
+    });
```

#### [m.args](https://github.com/ivoputzer/m.args/pull/3)

this should help with unifying the readme to other m.projects

#### [m.static](https://github.com/ivoputzer/m.static/pull/11)

this pr updates the badges in the readme

![/assets/images/posts/completed-hacktoberfest-2019/congratulations.png](/assets/images/posts/completed-hacktoberfest-2019/congratulations.png)

## another year, another hacktoberfest

did you participate this year? let me know [@christian_fei](https://twitter.com/christian_fei)