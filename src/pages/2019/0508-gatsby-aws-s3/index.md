---
title: Gatsbyで作ったブログをAWS上で運用する
date: "2019-05-08"
tags:
  - Gatsby
  - Blog
  - AWS
  - AWS Certificate Manager
  - S3
  - CloudFront
  - CodeBuild
---

## 前提／構成

## GitHub

## Amazon Route 53

### ドメインの登録

まず、Route 53 で、ドメインの登録を行います（AWS の他のサービスと連携しやすいという理由から）。Route 53 だとちょっと割高になるので、AWS 以外でドメインは取得しても構いません。

SWS のコンソールから、手順に従って、簡単に AWS 上でドメインを取得できます。

![Route-53-Management-Console-get-domain-1](Route-53-Management-Console-get-domain-1.png)

![Route-53-Management-Console-get-domain-2](Route-53-Management-Console-get-domain-2.png)

![Route-53-Management-Console-get-domain-3](Route-53-Management-Console-get-domain-3.png)

![Route-53-Management-Console-get-domain-4](Route-53-Management-Console-get-domain-4.png)

登録完了後、ドメイン取得には 30 分程度時間がかかります。

## AWS Certificate Manager

### 証明書のプロビジョニング

Amazon が発行する SSL/TLS 証明書の更新を管理します。

![AWS-Certificate-Manager-1](AWS-Certificate-Manager-1.png)

![AWS-Certificate-Manager-2](AWS-Certificate-Manager-2.png)

![AWS-Certificate-Manager-3](AWS-Certificate-Manager-3.png)

![AWS-Certificate-Manager-4](AWS-Certificate-Manager-4.png)

![AWS-Certificate-Manager-5](AWS-Certificate-Manager-5.png)

![AWS-Certificate-Manager-6](AWS-Certificate-Manager-6.png)

![AWS-Certificate-Manager-7](AWS-Certificate-Manager-7.png)

![AWS-Certificate-Manager-8](AWS-Certificate-Manager-8.png)

Certificate Manager (ACM) が DNS の検証をサポートしました  
<https://dev.classmethod.jp/cloud/aws/certificate-manager-dns-validation-support/>

### 証明書をリクエストする AWS リージョン (AWS Certificate Manager 用)

ビューワーと CloudFront との間で HTTPS を必須にするには、証明書をリクエストまたはインポートする前に AWS Certificate Manager コンソールで AWS リージョンを **米国東部（バージニア北部）** に変更する必要があります。

CloudFront で SSL/TLS の証明書を使用するための要件 - 証明書をリクエストする AWS リージョン (AWS Certificate Manager 用)  
<https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-aws-region>

## S3

CloudFront を利用する場合、S3 の静的ウェブサイトホスティングは利用しません（逆に、CloudFront 経由で S3 にアクセスする場合に、S3 の静的ウェブサイトホスティング機能を ON にしていると、CloudFront 経由でアクセスできなくなります）。

CloudFront を使用して S3 静的ウェブサイトを提供する手順  
<https://dev.classmethod.jp/cloud/aws/cloudfront-s3-web/>

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

一時的に、S3 に直接アクセスできるように設定して、S3 バケットにアクセスできるかどうか確認します。

その後、設定を変更し、

![S3-Management-Console-12](S3-Management-Console-12.png)

## CloudFront

![CloudFront-Management-Console-1](CloudFront-Management-Console-1.png)

![CloudFront-Management-Console-2](CloudFront-Management-Console-2.png)

![CloudFront-Management-Console-3](CloudFront-Management-Console-3.png)

![CloudFront-Management-Console-4](CloudFront-Management-Console-4.png)

![CloudFront-Management-Console-5](CloudFront-Management-Console-5.png)

![CloudFront-Management-Console-6](CloudFront-Management-Console-6.png)

![CloudFront-Management-Console-7](CloudFront-Management-Console-7.png)

![CloudFront-Management-Console-8](CloudFront-Management-Console-8.png)

![CloudFront-Management-Console-9](CloudFront-Management-Console-9.png)

CloudFront から S3 の Bucket へは、IAM ロールを使ってアクセスします。しかし、この場合、サーバサイドでの 301/302 リダイレクトができないため、index.html 以外へのアクセスができないです。

あとで、Lambda@Edge を使って、他のルーティングもできるように修正します。

デプロイに、けっこう時間がかかる。

AWS S3 を CloudFront 対応にする  
<https://www.aws-book.com/getting-started/cloudfront/s3.html>

残念ながら、今の設定だと、サーバ側の 301/302 のリダイレクトができなくなるので、ルートディレクトリとして設定した`index.html`以外の URL に直接アクセスすることができなくなってしまいます(この問題は、Gatsby の公式ページでも指摘されています)。

Deploying to S3/Cloudfront  
<https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/>

CloudFront redirecting to origin?  
<https://acloud.guru/forums/aws-certified-developer-associate/discussion/-KcC5f1fw3l4-tclsXje/cloudfront_redirecting_to_orig>

CloudFront ディストリビューションのオリジンとして S3 ウェブサイトのエンドポイントを使用しています。HTTP レスポンスコード 403 (Access Denied) が発生するのはなぜですか？  
<https://aws.amazon.com/jp/premiumsupport/knowledge-center/s3-website-cloudfront-error-403/>

Running GatsbyJS using Amazon S3 and CloudFront  
<https://www.bayphillips.com/blog/gatsbyjs-using-amazon-s3-and-cloudfront/>

## Lambda@Edge

Gatsby の仕様として、`http://imamachi-n.com:8000/2019/0508-gatsby-aws-s3/`のようなサブディレクトリにアクセスした場合、サーバサイドでのリダイレクト（301/302）が発生し、`http://imamachi-n.com:8000/2019/0508-gatsby-aws-s3/index.html`にアクセスします。

今回のように、S3 にオリジンを配置し、CloudFront にデータをキャッシュさせた場合、サーバサイドのリダイレクトができません。
CloudFront の`Default Root Object`で`index.html`に設定することができますが、以下に示すとおりトップページにしか適応されません。

- http://imamachi-n.com/ → index.html を返す
- http://imamachi-n.com/subdir/ → index.html は返りません

Deploying to S3/Cloudfront  
<https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/>

![Lambda-edge-1](Lambda-edge-1.png)

![Lambda-edge-2](Lambda-edge-2.png)

![Lambda-edge-3](Lambda-edge-3.png)

![Lambda-edge-4](Lambda-edge-4.png)

![Lambda-edge-5](Lambda-edge-5.png)

![Lambda-edge-6](Lambda-edge-6.png)

![Lambda-edge-7](Lambda-edge-7.png)

![Lambda-edge-8](Lambda-edge-8.png)

![Lambda-edge-9](Lambda-edge-9.png)

![Lambda-edge-10](Lambda-edge-10.png)

![Lambda-edge-11](Lambda-edge-11.png)

![Lambda-edge-12](Lambda-edge-12.png)

![Lambda-edge-13](Lambda-edge-13.png)

Lambda@Edge を設定するために、Lambda@Edge の IAM 実行ロールが必要です。  
Lambda 関数を生成したときにできる実行ロールには、Lambda 用のサービスプリンシパルしか許可されていないので、`edgelambda.amazonaws.com`を追加します。

IAM ロール設定の［信頼関係］タブを開いて、［信頼関係の編集］を開き、以下のように設定します。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

デフォルトでは、CloudFront イベントが Lambda 関数をトリガーするたびに、データが CloudWatch Logs に書き込まれます。これらのログを使用する場合は、CloudWatch Logs にデータを書き込むためのアクセス権限が実行ロールに必要です。
今回のケースだと、このログをいちいち出す必要がないので、この実行ロールを作りませんでした。

Lambda@Edge 用の IAM アクセス権限とロールの設定  
<https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html>
