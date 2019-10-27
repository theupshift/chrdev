---
title: Fun with single letter commands
layout: post.njk
tags:
  - post
date: 2019-07-19
---

here all single letter commands from my dotfiles

```
$ cd ~/dotfiles/dots/.config/fish/functions/

$ find . -name '?.fish'

./s.fish
./l.fish
./x.fish
./t.fish
./w.fish
./b.fish
./c.fish
./d.fish
./e.fish
./ex.fish
./i.fish
```

# s.fish

start npm package

runs `npm start`

# l.fish

list all files

runs `ls -lha `

# x.fish

exits the current shell

runs `exit`

# t.fish

obviously runs the tests

runs `npm test`

# w.fish

less used now, runs `npm run watch`

# b.fish

build npm package

runs `npm run build`

# e.fish

open a visual studio code window for the current directory

runs `code .`

# ex.fish

same as above, additionally exits terminal

runs `code . && exit 0`

# d.fish

is for deploying fast

runs `npm run deploy`

# c.fish

easy git clone

runs `git clone $argv`

usage `c git@github.com:christian-fei/christian-fei.github.io`

# i.fish

installs npm deps

runs `npm i $argv`