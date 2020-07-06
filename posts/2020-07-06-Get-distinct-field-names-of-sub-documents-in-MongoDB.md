---
title: "Get distinct field names of sub documents in MongoDB"
date: 2020-07-06
layout: post.njk
tags:
  - post
  - mongodb
---

Let's say you have these documents in your collection `items`:

```json
> db.items.find()

{ "_id" : ObjectId("5f0345275663006139066197"), "subDocument" : { "field1" : 42 } }
{ "_id" : ObjectId("5f03452c5663006139066198"), "subDocument" : { "field3" : 6 } }
{ "_id" : ObjectId("5f0345275663006139066199"), "subDocument" : { "field1" : 6 } }
```

In other words the fields of the sub document `subDocument` are not the same. They could be user-defined, or simply because of the nature of the domain you're working in.

--- 

So, how would you get the distinct field name of those sub-documents?

As a results I would like to have an array containing the different field names.

```js
> db.items.aggregate({
  $project: {
    subDocument: { 
      $objectToArray: "$subDocument"
    }
  }
}, {
  $unwind: '$subDocument'
}, {
  $project: {
    _id: '$subDocument.k'
  }
},
{
  $group: {
    _id: '$_id'
  }
})

{ "_id" : "field1" }
{ "_id" : "field3" }
```

Now you can just map each document and extract the `_id` field to have the distinct field names of all sub-documents.

# Explanatation

## $project with `$objectToArray`

[$objectToArray](https://docs.mongodb.com/manual/reference/operator/aggregation/objectToArray/) comes in handy in this case to destructure the object into `[key, value]` pairs in the following format:

```js
> db.items.aggregate({$project: { subDocument: { $objectToArray: "$subDocument" } }})
{ "_id" : ObjectId("5f0345275663006139066197"), "subDocument" : [ { "k" : "field1", "v" : 42 } ] }
{ "_id" : ObjectId("5f03452c5663006139066198"), "subDocument" : [ { "k" : "field3", "v" : 6 } ] }
{ "_id" : ObjectId("5f0346c85663006139066199"), "subDocument" : [ { "k" : "field1", "v" : 6 } ] }
```

## $unwind the subDocument array

We want to have objects to get the fields, so you `unwind` (kind of "unzip") the array in distinct objects.

```js
> db.items.aggregate({$project: { subDocument: { $objectToArray: "$subDocument" } }}, {$unwind: '$subDocument'})
{ "_id" : ObjectId("5f0345275663006139066197"), "subDocument" : { "k" : "field1", "v" : 42 } }
{ "_id" : ObjectId("5f03452c5663006139066198"), "subDocument" : { "k" : "field3", "v" : 6 } }
{ "_id" : ObjectId("5f0346c85663006139066199"), "subDocument" : { "k" : "field1", "v" : 6 } }
```

## $project just the `k` field

We are interested in each `k` (key) field of the subDocuments (that now are objects, instead of arrays after the $unwind stage):

```js
> db.items.aggregate({$project: { subDocument: { $objectToArray: "$subDocument" } }}, {$unwind: '$subDocument'}, {$project: {_id: '$subDocument.k'}})
{ "_id" : "field1" }
{ "_id" : "field3" }
{ "_id" : "field1" }
``` 

## $group by _id to get rid of duplicate fields

`$group` can be used similar to `.distinct`, but in an aggregation phase.

In this case, we want to "group" by the name of the fields, so that we have unique values:

```js
> db.items.aggregate({$project: { subDocument: { $objectToArray: "$subDocument" } }}, {$unwind: '$subDocument'}, {$project: {_id: '$subDocument.k'}}, {$group: {_id: '$_id'}})
{ "_id" : "field1" }
{ "_id" : "field3" }
```

---

Now you can map the `_id` fields and extract the values, to finally have the unique field names:

```js
> groupedFields = db.items.aggregate({$project: { subDocument: { $objectToArray: "$subDocument" } }}, {$unwind: '$subDocument'}, {$project: {_id: '$subDocument.k'}}, {$group: {_id: '$_id'}}).toArray()
[ { "_id" : "field3" }, { "_id" : "field1" } ]
> groupedFields.map(function (g) {return  g._id})
[ "field3", "field1" ]
```
