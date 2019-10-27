---
title: Preferred way of defining flags in bash
date: 2019-08-29
layout: post.njk
tags:
	- post
---

This is the easiest way I [found](https://jonalmeida.com/posts/2013/05/26/different-ways-to-implement-flags-in-bash/) of defining flags to set variables in a bash script.

let's call this file `flags.sh`:

```sh
#!/bin/bash

while [ ! $# -eq 0 ]
do
	case "$1" in
		--name | -n)
			NAME="$2"
			;;
		--id)
			ID="$2"
			;;
    # etc
	esac
	shift
done
```

This way I can `source` the file `flags.sh` and have the variables `$NAME` and `$ID` available, like this:

in `main.sh`

```sh
#!/bin/bash

source flags.sh

echo "NAME: $NAME"
echo "ID: $ID"
```

Awesome, right!? The same for functions (you get the point)

in `functions.sh`

```sh
#!/bin/bash

function print_name {
  echo "NAME: $1"
}
```

and again, in `main.sh`:

```sh
#!/bin/bash

source flags.sh
source functions.sh

print_name $NAME
```
