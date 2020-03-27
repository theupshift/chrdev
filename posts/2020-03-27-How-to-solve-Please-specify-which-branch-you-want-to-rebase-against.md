---
title: How to solve 'Please specify which branch you want to rebase against.'
date: 2020-03-27
layout: post.njk
tags:
  - post
  - tutorial
---

If you add a `remote` to an existing repository or you create a new branch,
you have to set up the remote branch tracking yourself.

This could be an error output, after running a `git pull --rebase` or you try to push with `git push`:

```sh
There is no tracking information for the current branch.
Please specify which branch you want to rebase against.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> local_branch_name
```

## see local and remote branches

run `git fetch --all` to update the references to remote branches.

then `git branch --all` to see all local and [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches).

e.g.:

```bash
~/D/p/christian-fei.github.io (master ↩) git branch --all
  css-grids
  dev
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/dev
  remotes/origin/master
```


## setting up remote branch tracking

Let's suppose the new branch is `dev`.

In this case, you would run:

```bash
git branch --set-upstream-to=origin/dev dev
```

