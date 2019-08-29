---
title: AWS Lambda + S3 + ffmpeg = Timelapse
date: 2019-08-30
layout: post.njk
tags: post
---

Yes you read that right. Figured out a way to make a timelapse thanks to AWS Lambda and a bucket with images on S3.

## Requirements

- configured aws cli (install with `pip` or `brew`)


## Deploy the ffmpeg layer

With aws lambda you can leverage an existing layer made of pre-built packages.

You can extend the [ffmpeg-lambda-layer](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~ffmpeg-lambda-layer) to write the Lambda with ffmpeg built in.

So to do this, deploy the Layer via the serverless repo: [Click here](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~ffmpeg-lambda-layer) and deploy it on AWS Lambda

## Create an S3 bucket

Name it, for example, "garden-snapshots" **in the same region as the ffmpeg-lambda-layer**

## Get project

Download the project from here: [github.com/christian-fei/timelapse-lambda](https://github.com/christian-fei/timelapse-lambda)

```
git clone git@github.com:christian-fei/timelapse-lambda.git
```

## Create IAM Role

Go to [IAM](https://console.aws.amazon.com/iam/home?region=us-east-1#/users) and create a role with the following permissions:

- AmazonS3FullAccess
- AWSLambdaFullAccess

![lambda-iam.png](/assets/images/posts/lambda-iam.png)


## Create timelapse lambda

run `./create-aws-lambda` by specifying the needed parameters, below you can find an example.

**in the same region as above!**

```
./create-aws-lambda \
  --region us-east-1 \
  --lambda Timelapse \
  --role arn:aws:iam::XXXXXXXXXXX:role/lambda_name \
  --ffmpeg arn:aws:lambda:us-east-1:XXXXXXXXXXX:layer:ffmpeg:1
```

## update the lambda with the code

specify the region and the lambda name as above and run:

```
./deploy-aws-lambda \
  --region us-east-1 \
  --lambda Timelapse
```

# usage

Download the project from here: [github.com/christian-fei/timelapse-lambda](https://github.com/christian-fei/timelapse-lambda)

```
git clone git@github.com:christian-fei/timelapse-lambda.git
```

`npm install` and take a look at [`launch-lambda-example.js`](https://github.com/christian-fei/timelapse-lambda/blob/master/launch-lambda-example.js):

```js
#!/usr/bin/env node

const AWS = require('aws-sdk')

const region = 'us-east-1'

const apiVersion = 'latest'
const lambda = new AWS.Lambda({ apiVersion, region })
const invokeParams = { FunctionName: 'Timelapse' }

lambda.invoke(invokeParams, (err, data) => {
  console.log(err, data)
})
```