---
title: Gatsbyで作ったブログをAWS上で運用する
date: "2019-05-08"
tags:
  - Gatsby
  - Blog
  - AWS
  - S3
  - CloudFront
  - CodeBuild
---

## GitHub

## Amazon Route 53

### ドメインの登録

手順に従って、AWS 上でドメインを取得する。
AWS 以外でドメインは取得しても構わない（AWS だとちょっと割高）。

ドメイン取得には、時間がかかります。

## AWS Certificate Manager

### 証明書のプロビジョニング

Amazon が発行する SSL/TLS 証明書の更新を管理します。

## S3

ウェブサイトアクセスに必要なアクセス許可  
<https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html>

S3 のバケットポリシーを変更しようとしたとき、初期設定で「新規のバケットポリシーをブロックする」にチェックが付いているので、変更できないようになっている。

そのため、オブジェクトを GET する権限を降るために、一時的にパブリックアクセス権限を変更する。

S3 のバケットポリシーを書こうとしてもアクセス拒否される件について  
<https://qiita.com/hiroyuki7/items/611d6e66831523c9ec64>

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::www.imamachi-n.com/*"]
    }
  ]
}
```

Deploying to S3/Cloudfront  
<https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/>

```bash
yarn add gatsby-plugin-s3
```

`gatsby-config.js`に以下の項目を追加する。

```
plugins: [
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'my-website-bucket',
        acl: null
      },
    },
]
```

`package.json`の scripts の項目にコマンドを登録する。

```json
"scripts": {
   ...
   "deploy": "gatsby-plugin-s3 deploy",
}
```

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

```bash
yarn build && yarn deploy
```

<http://www.imamachi-n.com.s3-website-ap-northeast-1.amazonaws.com>

## CloudFront
