---
title: Connect to MongoDB with monk in Node.js
date: 2020-02-08
layout: post.njk
tags:
  - post
  - javascript
  - nodejs
  - featured
  - tutorial
image: https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---


[monk's github repo](https://github.com/Automattic/monk) description says it all

> The wise MongoDB API

> A tiny layer that provides simple yet substantial usability improvements for MongoDB usage within Node.JS.

<img class="tacb" src="https://raw.githubusercontent.com/Automattic/monk/master/assets/monk.png" />

**I love the super simple api**

```js
const db = require('monk')('localhost/db')
const users = db.get('users')
```

# Use it in production 💯

Below you can see a real-world snippet of the db connection for [pomodoro.cc](https://pomodoro.cc) (source code [here](https://github.com/christian-fei/pomodoro.cc/blob/master/api/db.js)).

The file `lib/db.js`

```js
const monk = require('monk')
const logger = require('pino')()

logger.info('process.env.NODE_ENV', process.env.NODE_ENV)
logger.info('MONGO_URL set?', !!process.env.MONGO_URL)
module.exports = monk(process.env.MONGO_URL)
```

Nothing more, nothing less.

You could use it then to create your models and repositories around it:

For example [`lib/models/users.js`](https://github.com/christian-fei/pomodoro.cc/blob/master/api/models/User.js):

```js
const db = require('../db')
const users = db.get('users')

users.createIndex({ _id: 1 })
users.createIndex({ createdAt: 1 })

module.exports = users
```

# use cases

## stream a collection

In [pomodoro.cc](https://pomodoro.cc) I use this feature to stream documents from the users collection, to update a users twitter avatar.

Here you can find the [full code snippet](https://github.com/christian-fei/pomodoro.cc/blob/master/api/scripts/update-users-twitter-avatar.js):

```js
await users.find({
  twitterAvatarNotFound: { $exists: false },
  $or: [{
    twitterAvatarUpdatedAt: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) }
  }, {
    twitterAvatarUpdatedAt: { $exists: false }
  }]
})
  .each(async (user, { pause, resume }) => {
    // ... process user twitter avatar
  })
  .catch(err => console.error(err))
```

## Aggregations

Again, as a real-world production use-case, I take pomodoro.cc's [daily analytics aggregation](https://pomodoro.cc/pro) for [Pro users](https://pomodoro.cc/pro).

In this example I want to showcase how a daily aggregate of documents can be done with MongoDB, monk and Node.js.

About aggregations from [the official docs](https://docs.mongodb.com/manual/aggregation/):

> Aggregation operations process data records and return computed results. Aggregation operations group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result. MongoDB provides three ways to perform aggregation: the aggregation pipeline, the map-reduce function, and single purpose aggregation methods.

An  example from [pomodoro.cc source code](https://github.com/christian-fei/pomodoro.cc/blob/822fb036bdd965583639f042bedd2e04b788dd45/api/routes/analytics-factory.js#L48)

```js
  return pomodoros.aggregate(
    [
      {
        $match: {
          userId: monk.id(userId)
        }
      }, {
        $project: {
          doc: '$$ROOT',
          year: { $substr: [`$${field}`, 0, 4] },
          month: { $substr: [`$${field}`, 5, 2] },
          day: { $substr: [`$${field}`, 8, 2] }
        }
      }, {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            day: '$day'
          },
          docs: {
            $push: '$doc'
          }
        }
      }, {
        $project: {
          _id: 0,
          day: {
            $concat: ['$_id.year', '-', '$_id.month', '-', '$_id.day']
          },
          docs: '$docs'
        }
      }, {
        $sort: {
          day: -1
        }
      }
    ]
  )
```

Here I aggregated documents of a collection by date, matched by a single userId.

## upsertion - update or insert

what an upsert operation is in a few words:

> Insert a New Document if No Match Exists

from the [official docs](https://docs.mongodb.com/manual/reference/method/db.collection.update/) you can see that

> Optional. If set to true, creates a new document when no document matches the query criteria. The default value is false, which does not insert a new document when no match is found.

It as simple as providing the `upsert: true` option to the `update` function:

```js
const result = await books.update(
   { item: "ZZZ135" },   // Query parameter
   {                     // Replacement document
     item: "ZZZ135",
     stock: 5,
     tags: [ "database" ]
   },
   { upsert: true }      // Options
)
```

The result will look something like this:

```js
{
  "nMatched" : 0,
  "nUpserted" : 1,
  "nModified" : 0,
  "_id" : ObjectId("5da78973835b2f1c75347a83")
}
```

this gives us more information on what the update operation actually did.

---

## Let me know how you are using monk in production!
