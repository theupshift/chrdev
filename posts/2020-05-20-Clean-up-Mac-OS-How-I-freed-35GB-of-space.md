---
title: "Clean up Mac OS: How I freed 35GB of space"
date: 2020-05-20
layout: post.njk
tags:
  - post
  - featured
  - mac
image: https://images.unsplash.com/photo-1529220502050-f15e570c634e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

My disk space was running low. I had less than 100MB of free space. I was sick of running low on disk space.

Clean My Mac wasn't an option. I don't want to spend 40$ for a cleaning tool, if you're so inclined feel free to do it.

---

A search on GitHub revealed the following scripts (not very much up to date, but they get their job done):

- https://github.com/mengfeng/clean-my-mac
- https://github.com/fwartner/mac-cleanup
- https://github.com/jgamblin/MacOS-Maid/blob/master/maid.sh

# rm -rf all the things

I selectively ran the steps in [clean_my_mac.sh](https://github.com/mengfeng/clean-my-mac/blob/master/clean_my_mac.sh).

The available disk space went up a few GB.

![https://media.giphy.com/media/Vd317WWBZKB6zP1WV1/giphy.gif](https://media.giphy.com/media/Vd317WWBZKB6zP1WV1/giphy.gif)

Ran a few steps from [maid.sh](https://github.com/jgamblin/MacOS-Maid/blob/master/maid.sh) which helped to free up some more GB:

```
...
#Taking out the trash.
printf "Emptying the trash.\n"
sudo rm -rfv /Volumes/*/.Trashes > /dev/null 2>&1
sudo rm -rfv ~/.Trash  > /dev/null 2>&1

#Clean the logs.
printf "Emptying the system log files.\n"
sudo rm -rfv /private/var/log/*  > /dev/null 2>&1
sudo rm -rfv /Library/Logs/DiagnosticReports/* > /dev/null 2>&1

printf "Deleting the quicklook files.\n"
sudo rm -rf /private/var/folders/ > /dev/null 2>&1
...
```

# mac-cleanup

Then I installed `mac-cleanup` with `sh -c "$(curl -fsSL https://raw.githubusercontent.com/fwartner/mac-cleanup/master/installer.sh)"` and ran `cleanup -n`.

It's gonna take a while.

`-n` skips brew. brew is going to be inspected separately.

## inspecting brew

Running `brew cask list` list revealed a whole lot of heavy casks installed in the past. nuke them.

Simply get the name of the cask and run `brew cask uninstall [CASK_NAME]`.

Did the same for `brew list`, then running `brew uninstall [NAME]`.

# mac-cleanup again

Ran `cleanup` (this time without the `-n` flag), and this is the result:

![mac cleaned](/assets/images/posts/mac-cleaned.png)
