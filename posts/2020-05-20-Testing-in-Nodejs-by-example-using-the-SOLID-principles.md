---
title: "Testing in Node.js by example using the SOLID principles"
date: 2020-05-20
layout: post.njk
tags:
  - post
  - featured
  - tdd
  - refactoring
  - cleancode
  - nodejs
  - javascript
  - testing
image: https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
---

# An example application

I'm going to outline an example to make the concept clearer:

You need to send a recurring email to some users (a newsletter for example), based on some business logic.

The business logic / user story could say:

"As a user

I want to receive an email every week

So that I can stay up to date with the latest news."

*This is intentionally a contrived example to reduce the scope of the exercise*.

## Topics, Approaches and Tools

Concepts discussed below are

- SOLID principles
  - Single Responsibility Principle
  - Open-Closed Principle
  - Dependency Inversion Principle
- Reason for a software component to change
- Test doubles like Spies and Stubs
- Collaborators in tests
- User Acceptance tests
- Unit tests


On the technical side, I am going to use the following tools

- [sinon](https://sinonjs.org/) for easy Test Doubles
- [ava](https://github.com/avajs/ava) for running the tests
- MongoDB as an example, but of course the persistence can be changed at your liking
- [no real email API service](https://github.com/christian-fei/email-newsletter-testing-by-example/blob/master/lib/email.js), to keep it simple


# A testable implementation

## Test-driven design

It's important to come up with clear collaborators and responsibilities for your internal modules and functions.

This comes almost for free if you start your application by test-driving it using TDD.

> The design emerges and your tests will scream if they need a collaborator

## A failing user acceptance test

To start, let's imagine to have a user that signed up in the past.

The user didn't yet receive the newsletter via email.

```javascript
test('sends a newsletter to users that did not yet receive it', async t => {
  await UserRepository.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  await newsletter.run()

  // what should I assert here??
  // we need a collaborator for the newsletter...
})
```

As you can see I have difficulties to define what to assert / test.

## Define the collaborators

To define the collaborators I try to follow the Single Responsibility Principle (from the SOLID principles family).

Meaning that a software component (class etc.) should have a single reason to change.

You can take it a step further and see it from the business point of view:

Who is the "actor" (like a person or business sector) associated to a specific software component or module?

That person *is* the reason for a software component to change.

Practical examples?

- Marketing could want to change the frequency of the newsletter
- Marketing wants to change the contents of the newsletter
- You or DBA's want to save the users in a different place

You could continue on here, but let's stay practical and let the design emerge.

## Unit-testing the UserRepository

Below you can see a unit-test for the repository.

It asserts that when calling the method `findNotYetReceivedNewsletter`, the correct number of users are returned.

It verifies that the underlying collection is queried correctly.

```javascript
test('find users that did not yet receive the newsletter', async t => {
  await UsersCollection.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: new Date() })
  await UsersCollection.insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  sinon.spy(UsersCollection, 'find')

  const users = await userRepository.findNotYetReceivedNewsletter()
  t.true(Array.isArray(users))
  t.is(users.length, 1)

  t.true(UsersCollection.find.calledOnce)
  t.true(UsersCollection.find.calledWith({ lastEmailSentAt: null }))
})
```

## Unit-testing the EmailService

In this case, the actual sending of the emails is "stubbed" out, so no emails are actually sent.

I verify that the `send` method of the `email` module is actually called.

```javascript
test('sends newsletter to user', async t => {
  const user = { name: 'test', email: 'test@test.com', lastEmailSentAt: null }
  const emailStub = sinon.stub(email, 'send')
  await emailService.sendTo(user)
  t.is(emailStub.callCount, 1)
})
```


## Inverting dependencies with the DIP principle

One could be inclined to put all the logic inside a function and call it a day.

It could work, but for how long? Or better: how do you effectively test it?

One approach could be to inject those dependencies and collaborators in a controlled manner.

We're effectively *inverting* the dependencies by [avoiding depending on details, but abstractions](https://en.wikipedia.org/wiki/Dependency_inversion_principle).

E.g.

In the first UAT I think it's apparent that we need to provide the newsletter module at least a way to **retrieve the users**.

Let's try it with a **UserRepository**, and assert that the Users collection has been queried for users that did not receive a newsletter yet:

```javascript
test('sends a newsletter to users that did not yet receive it', async t => {
  await db.get('users').insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })
  sinon.spy(userRepository, 'findNotYetReceivedNewsletter')

  await newsletter.run(userRepository)

  t.is(userRepository.findNotYetReceivedNewsletter.callCount, 1)
  // we still need a collaborator for sending the newsletter...
})
```

Using `.spy` since I want the DB to be queried, and later assert that the function has been called.

For the email, I don't want the real function to be called, hence using `.stub`.

I am passing in the collaborators in the tests, and use the real implementations in the application code.

We're making the newsletter code [open for extension, but closed for modification](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)

```javascript
async function run (userRepository, emailService) {
  const users = await userRepository.findNotYetReceivedNewsletter()
  for (const user of users) {
    await emailService.sendTo(user)
  }
}
```

## Stubbing the email service

```javascript
test('sends a newsletter to users that did not yet receive it', async t => {
  await db.get('users').insert({ name: 'test', email: 'test@test.com', lastEmailSentAt: null })

  sinon.spy(userRepository, 'findNotYetReceivedNewsletter')
  sinon.stub(emailService, 'sendTo')

  await newsletter.run(userRepository, emailService)

  t.is(userRepository.findNotYetReceivedNewsletter.callCount, 1)
  t.is(emailService.sendTo.callCount, 1)
  // implement your assertions about arguments, like "recipient", "subject", "content" of the email etc.
})
```

The `emailService` could interact with the Mailgun API, Sendgrid, etc. That's up to you.

## File structure

Below an outline of the [file structure of the project](https://github.com/christian-fei/email-newsletter-testing-by-example):

```
├── index.js
├── index.test.js
├── lib
│   ├── db.js
│   ├── email-service.js
│   ├── email-service.test.js
│   ├── email.js
│   ├── email.test.js
│   ├── user-repository.js
│   └── user-repository.test.js
├── package-lock.json
└── package.json
```

The other software components are Unit tested, for further details check out [the project on GitHub](https://github.com/christian-fei/email-newsletter-testing-by-example/)

Every collaborator has their own tests (except `lib/db.js` since it's a simple wrapper around `monk` that is already well tested).

`email.js` is the wrapper around your API of choice to send emails and has a single exposed function `.send`.

You can find the [full project on GitHub](https://github.com/christian-fei/email-newsletter-testing-by-example).
