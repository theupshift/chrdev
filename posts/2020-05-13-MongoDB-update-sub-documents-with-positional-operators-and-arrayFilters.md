---
title: "MongoDB: update sub documents with positional operators and arrayFilters"
date: 2020-05-13
layout: post.njk
tags:
  - draft
---

Updating can be dauting, especially if you're running a version of MongoDB lower than 3.6.

I'm specifically mentioning 3.6 because it introduces a handy feature, namely `arrayFilters` in conjunction with `positional operators`.

Keep reading to find out more about those.

---

### `arrayFilters`

What `arrayFilters` does is simple:

> "... An array of filter documents that determine which array elements to modify for an update operation on an array field."

You can read "array field" as "sub documents".

So `arrayFilters`, can be used in an `update` operation to match **specific sub documents** based on an array of *filter document*.

### positional operators

Since 3.6 there are new positional operators available.

> A positional operator is a placeholder to target specific values of sub documents

- `$` updates the first matching element/field of the sub document
- `$[]` updates elements/fields of all sub document
- `$[field]` updates elements/fields only of *matching sub documents* (via `arrayFilters`)

---

Ok, this sounds all fine and dandy, but in practice how does it work?

**Below some examples**.

## `$[field]` and `arrayFilters`

This is probably what you're here for.

> I want to update only **specific** sub document elements/fields that match a filter condition (`arrayFilters`)

```js
> db.dispensary.insert({ name: 'chocolate cookies', eatenBy: [] })
WriteResult({ "nInserted" : 1 })
> db.dispensary.update({ name: 'chocolate cookies' }, { $push: { eatenBy: { name: 'alice', amount: 2 } } })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dispensary.update({ name: 'chocolate cookies' }, { $push: { eatenBy: { name: 'bob', amount: 3 } } })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dispensary.find()
{ "_id" : ObjectId("5ebb895f2216ccc85789071c"), "name" : "chocolate cookies", "eatenBy" : [ { "name" : "alice", "amount" : 2 }, { "name" : "bob", "amount" : 3 } ] }
> db.dispensary.update({ name: 'chocolate cookies' }, { $set: { 'eatenBy.$.amount': 1 } })
WriteResult({
	"nMatched" : 0,
	"nUpserted" : 0,
	"nModified" : 0,
	"writeError" : {
		"code" : 2,
		"errmsg" : "The positional operator did not find the match needed from the query."
	}
})
> db.dispensary.update({ name: 'chocolate cookies' }, { $set: { 'eatenBy.amount': 1 } })
WriteResult({
	"nMatched" : 0,
	"nUpserted" : 0,
	"nModified" : 0,
	"writeError" : {
		"code" : 28,
		"errmsg" : "Cannot create field 'amount' in element {eatenBy: [ { name: \"alice\", amount: 2.0 }, { name: \"bob\", amount: 3.0 } ]}"
	}
})
> db.dispensary.update({ name: 'chocolate cookies', 'eatenBy.name': 'alice' }, { $set: { 'eatenBy.$.amount': 1 } }, {})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dispensary.find()
{ "_id" : ObjectId("5ebb895f2216ccc85789071c"), "name" : "chocolate cookies", "eatenBy" : [ { "name" : "alice", "amount" : 1 }, { "name" : "bob", "amount" : 3 } ] }
> db.dispensary.update({ name: 'chocolate cookies' }, { $push: { eatenBy: { name: 'alice', amount: 3 } } })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dispensary.find()
{ "_id" : ObjectId("5ebb895f2216ccc85789071c"), "name" : "chocolate cookies", "eatenBy" : [ { "name" : "alice", "amount" : 1 }, { "name" : "bob", "amount" : 3 }, { "name" : "alice", "amount" : 3 } ] }
> db.dispensary.update({ name: 'chocolate cookies', 'eatenBy.name': 'alice' }, { $set: { 'eatenBy.$.amount': 1 } }, {})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
> db.dispensary.find()
{ "_id" : ObjectId("5ebb895f2216ccc85789071c"), "name" : "chocolate cookies", "eatenBy" : [ { "name" : "alice", "amount" : 1 }, { "name" : "bob", "amount" : 3 }, { "name" : "alice", "amount" : 3 } ] }
> db.dispensary.update({ name: 'chocolate cookies', 'eatenBy.name': 'alice' }, { $set: { 'eatenBy.$.amount': 1 } }, {})
```


https://docs.mongodb.com/manual/reference/method/db.collection.update/#update-array-filters
https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/
https://docs.mongodb.com/manual/reference/operator/update/push/
https://docs.mongodb.com/manual/reference/operator/update/set/
https://docs.mongodb.com/manual/reference/operator/update/positional/#up._S_
https://docs.mongodb.com/manual/reference/command/update/#update-command-arrayfilters
