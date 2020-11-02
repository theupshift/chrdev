---
title: "How to fix xcode-select no developer tools found"
date: 2020-11-02
layout: post.njk
tags:
  - draft
  - post
  - xcode
  - mac
  - tutorial
---

Saw the following error when I was trying to install an npm dependency, that had native C bindings:

```sh
npm ERR! No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
npm ERR!
npm ERR! No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
npm ERR!
npm ERR! No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.
npm ERR!
npm ERR! gyp info spawn make
npm ERR! gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]
npm ERR! xcode-select: note: no developer tools were found at '/Applications/Xcode.app', requesting install. Choose an option in the dialog to download the command line developer tools.
npm ERR! gyp ERR! build error
npm ERR! gyp ERR! stack Error: `make` failed with exit code: 1
npm ERR! gyp ERR! stack     at ChildProcess.onExit (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:194:23)
npm ERR! gyp ERR! stack     at ChildProcess.emit (node:events:327:20)
npm ERR! gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:277:12)
```

As scary as it might look, the solution seems seeminly simply.

After reading on various threads about using `xcode-select --install` and `xcode-select --reset` to get the download of xcode and the mac developer tools going.

But in my case the xcode download never started, or simply didn't succeed with the installation. 

At the time I am using a MBP 13" 2015 with Mac OS Catalina 10.15.17

---

# Solution

In my case, I had to go to [this apple website](https://developer.apple.com/download/more/?=command%20line%20tools) and download the `Command Line Tools for Xcode 12` (Release date Sep 17, 2020).

Install the Command Line Tools with the downloaded DMG and you should be good to go.
