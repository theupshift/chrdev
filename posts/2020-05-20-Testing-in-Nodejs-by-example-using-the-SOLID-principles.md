---
title: "Testing in Node.js by example using the SOLID principles"
date: 2020-05-20
layout: post.njk
tags:
  - draft
  - tdd
  - refactoring
  - cleancode
  - nodejs
  - javascript
---

# An example application

I'm going to outline an example to make the concept clearer:

You need to send a recurring email to some users (a newsletter for example), based on some business logic.

The business logic / user story could say:

"As a user
I want to receive an email every week
So that I can stay up to date with the latest news."

*This is intentionally a contrived example to reduce the scope*

# A testable implementation

## Test driven design / development

I think it's important to come up with clear collaborators and responsibilities for your internal modules and functions.

This comes almost for free if you start your application by test-driving it using TDD. 

> The design emerges and collaborators are your tests will scream if they need a collaborator

## A failing user acceptance test

To start, let's imagine to have a user that signed up in the past.

The user didn't yet receive the newsletter via email.

```javascript
test('sends a newsletter to users that did not yet receive it', async t => {
  // Arrange:
  await Users.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  // Act:
  await newsletter.run()
  
  // Assert:
  // what should I assert here??
  // we need a collaborator for the newsletter...
})
```

As you can see I have difficulties to define what to assert / test.

## Define the collaborators

To define the collaborators I try to follow the Single Responsibility Priniciple (from the SOLID principles family).

Meaning that a software component (class etc.) should have a single reason to change. 

You can take it a step further and see it from the business point of view: 

Who is the "actor" (like a person of business sector) associated to a specific software component or module?

That person *is* the reason for a software component to change.

Practical examples? 

- Marketing could want to change the frequency of the newsletter
- DBA wants to save the users in a different place
- Marketing wants to change the contents of the newsletter

You could continue on here, but let's stay practical and let the design emerge.

## Inverting dependencies

One could be inclined to put all the logic inside a function and call it a day.

It could work, but for how long? Or better: how do you test effectively test it?

One approach could be to inject those dependencies and collaborators in a controlled manner.

The code should be clearly define on what it depends and use it in production code and in tests.

E.g.

In the first UAT I thinks it's apparent that we need to provide the newsletter module at least a way to **retrieve the users**.

Let's try it with a **UserRepository**, and assert that the Users collection has been queried for users that did not receive a newsletter yet:

```javascript
test('sends a newsletter to users that did not yet receive it', async t => {
  // Arrange:
  await Users.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })
  
  sinon.spy(Users, 'find')

  // Act:
  await newsletter.run(Users)
  
  // Assert:
  t.is(Users.find.callCount, 1)
  // we still need a collaborator for sending the newsletter...
})
```

Using `sinon` because I find it the most practical way to define spies/stub/mocks/fakes in Node.js. 
You could achieve the same by recording the arguments in a special test implementation.

## Making the test pass ✅

To do so, I would do something like this for the newsletter module, using *ES6 default parameters*:

```javascript
const UserRepository = require('./storage/user-repository')

async function run (userRepository = UserRepository) {
  const queryUsersNewsletterNotSent = {
    lastEmailSentAt: null
  }
  const users = await userRepository.find(queryUsersNewsletterNotSent)
}
```

## Opening and closing the software component

