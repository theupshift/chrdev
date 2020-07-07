---
title: "Aggregations with sub-documents in MongoDB"
date: 2020-07-06
layout: post.njk
tags:
  - post
  - mongodb
  - featured
image: /assets/images/posts/mongodb.jpg
---

I would like to extract statistics about sub-documents in a collection.

E.g. in the form of `count`, `sum` and `average` for each field

Let's say you have the following documents in the `items` collection:

```js
> db.items.find()
{ "_id" : ObjectId("5f034ce90b15686f5d78baed"), "subDocument" : { "field1" : 42, "field3" : 10 } }
{ "_id" : ObjectId("5f034ce90b15686f5d78baee"), "subDocument" : { "field2" : 14, "field3" : 6 } }
{ "_id" : ObjectId("5f034ce90b15686f5d78baef"), "subDocument" : { "field1" : 6, "field4" : 11 } }
{ "_id" : ObjectId("5f034cea0b15686f5d78baf0"), "subDocument" : { "field3" : 3, "field4" : 26 } }
```

How would you solve the use-case of aggregating each field of the `subDocument`'s dynamically?

Event without actually "knowing" which fields are contained in `subDocument`?

---

My approach is the following:

```js
> db.items.aggregate({
    $project: { subDocument: { $objectToArray: "$subDocument" } }
  }, {
    $unwind: '$subDocument'
  }, {
    $addFields: { 'type': {$type: '$subDocument.v'} }
  }, {
    $match: { type: { $in: ['int', 'double', 'long', 'decimal'] } }
  }, {
    $group: {
      _id: "$subDocument.k",
      count: {
        $sum: { $cond: [{ $ifNull: ['$subDocument.k', false] }, 1, 0] }
      },
      sum: {
        $sum: "$subDocument.v"
      },
      average: {
        $avg: "$subDocument.v"
      }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
)
```

And the results looks like this:


```js
{ "_id" : "field1", "count" : 2, "sum" : 48, "average" : 24 }
{ "_id" : "field2", "count" : 1, "sum" : 14, "average" : 14 }
{ "_id" : "field3", "count" : 3, "sum" : 19, "average" : 6.333333333333333 }
{ "_id" : "field4", "count" : 2, "sum" : 37, "average" : 18.5 }
```

# Explanation

## $project with `$objectToArray`

[$objectToArray](https://docs.mongodb.com/manual/reference/operator/aggregation/objectToArray/) comes in handy in this case to destructure the object into `[key, value]` pairs.

## $unwind the subDocument array

We want to have objects to get the fields, so you `unwind` (kind of "unzip") the array in distinct objects.

## Add a type and filter by just numeric values

With these pipeline steps

```js
  {
    $addFields: { 'type': {$type: '$subDocument.v'} }
  }, {
    $match: { type: { $in: ['int', 'double', 'long', 'decimal'] } }
  }
```

we add a "type" field to each document (that now represents each field with its value), and filter by just "number" types.

## $group and extracts stats

In the `$group` stage we are grouping the the field name, namely `$subDocument.k`.

For each document that falls into this bucket, we can `count` how many matches there are, the `sum` of the values, and finally an average with `$avg`

## Finally, $sort the results

Sort by the grouped field name to have them alphabetically ordered.
