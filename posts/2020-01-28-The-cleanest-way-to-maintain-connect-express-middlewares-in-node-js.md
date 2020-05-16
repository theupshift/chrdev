---
title: The cleanest way to maintain connect / express middlewares in Node.js
date: 2020-01-28
layout: post.njk
tags:
  - post
  - featured
  - javascript
  - nodejs
image: https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

I want to share how I maintain my [connect](https://www.npmjs.com/package/connect) / [express](https://www.npmjs.com/package/express) middlewares for simple HTTP APIs in Node.js

The code snippets below are taken from [pomodoro.cc](https://pomodoro.cc) [api source code](https://github.com/christian-fei/pomodoro.cc/blob/master/api/middlewares.js).

## Defining the middlewares

Below you can see a simple file containing all middlewares, exported as an array.

In this example the middlewares in use are:

- `cookie-parser` to parse cookies e.g. for sessions
- `body-parser` to handle JSON bodies
- `cors` to mitigate CORS-related headaches
- `morgan` for logging

> the order of connect middlewares is important, as it can be seen as a pipeline of handlers, executed one by one.

this is why the handling of CORS requests must happen **before** parsing cookies or the request body for instance.


```js
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

module.exports = [
  morgan(':status\t :method\t :response-time ms\t :date[clf]\t :url\t\t'),
  cors({
    origin: true,
    methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['x-now-id', 'x-now-trace', 'x-powered-by', 'Origin', 'Accept', 'Content-Type', 'Set-Cookie'],
    credentials: true
  }),
  cookieParser(),
  bodyParser.json({}),
  bodyParser.urlencoded({ extended: true })
]
```

> you can call this file `middlewares.js` to follow along with the code

## Using the middlewares

In the following code snippet you can see an example usage of the middlewares, in a bare-bone connect / express application in Node.js

```js
const app = require('express')()
const middlewares = require('./middlewares')
app.use(...middlewares)
app.post('/hello', (req, res) => res.json(`hello ${req.body.name}`))
app.listen(process.env.HTTP_PORT || 3000)
console.log('listening on http://localhost:3000')
```

and run

```bash
node index.js
```

## Making a request

Once the server is listening on port `3000`, you can run the following and see the middlewares in action with `curl`!

You will get an output similar to this one:

```bash
> curl -vv -X POST -H 'Content-Type: application/json' http://localhost:3000/hello --data '{"name": "chris"}'

...
...
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Credentials: true
< Content-Type: application/json; charset=utf-8
< Content-Length: 13
< Vary: Origin
< ETag: W/"d-WPAgGvBxJ3QraEI06EWKezzLidE"
< Date: Tue, 28 Jan 2020 22:36:18 GMT
< Connection: keep-alive
<

"hello chris"*
```

Notice the headers `Access-Control-Allow-Credentials`?

That's for example where the CORS middleware comes in, that is currently configured to allow credentials for CORS requests.

As you can see in middlewares.js:

```js
...
  cors({
    origin: true,
    methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['x-now-id', 'x-now-trace', 'x-powered-by', 'Origin', 'Accept', 'Content-Type', 'Set-Cookie'],
    credentials: true
  }),
...
```

---

Let me know on [Twitter](https://twitter.com/christian_fei) if you have questions or found better ways to handle middlewares!
