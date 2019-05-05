---
title: Gatsbyでブログを作る上で必要となる知識まとめ
date: '2019-04-11'
tags: 
  - Gatsby
  - Blog
---

## CSSリセット

```bash
yarn add minireset.css
```

## Gatsby typographyプラグインを導入する

`gatsby-plugin-typography`を使うことでフォントの設定をすることができます。

```bash
yarn add gatsby-plugin-typography react-typography typography typography-theme-wordpress-2016
```

## emotion

CSS-in-JSのライブラリ。JavaScriptのコードの中に、CSSの定義を埋め込む形式。高いパフォーマンス。コードの可読性は悪くなる？

Gatsby用のプラグインがあるので、導入する必要があります（逆に、プラグインを導入しないとEmotionのCSSの定義が適応されないので注意です）。  
<https://www.gatsbyjs.org/docs/emotion/>  
<https://emotion.sh/>  

```bash
yarn add gatsby-plugin-emotion @emotion/core
```

`gatsby-config.js`に次のコードを追加します。

```javascript
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```

## StaticQuery

Gatsby v2から導入された新しいAPI。Pageコンポーネントで使われているGraphQLタグは、Pageコンポーネント以外では使用できませんでした。v2から導入されたStaticQueryを利用することで、Layoutコンポーネントのように、PageコンポーネントでないコンポーネントでもGraphQLが利用できるようになります。

以下に具体例を示す。

```javascript
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
      </header>
    )}
  />
)
```

`gatsby-config.js`ファイルに以下の内容が記載されている場合を想定します。

```javascript
module.exports = {
  siteMetadata: {
    title: `Imamachi-n blog`,
  },
}
```

`gatsby develop`コマンドを実行後、`http://localhost:8000/___graphql`のURLにアクセスし、以下のクエリを実行してみます。

```graphql
query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
    }
```

すると、以下の結果が得られるはずです。

```graphql
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Imamachi-n blog"
      }
    }
  }
}
```

![GraphiQL_2019-04-16_21-40-28](GraphiQL_2019-04-16_21-40-28.png)

## Metaタグを追加する

### react-helmetを使う

`gatsby-plugin-react-helmet`プラグインを導入します。

```bash
yarn add react-helmet gatsby-plugin-react-helmet
```

`gatsby-config.js`に次のコードを追加します。

```javascript
module.exports = {
  plugins: [
      `gatsby-plugin-react-helmet`,
  ],
}
```

`<Helmet>`タグを使って、Metaタグを組み込みます。以下の例では、ページのタイトルを設定しています。

```js
import { Helmet } from "react-helmet"

export default () => {
  <>
    <Helmet>
      <title>{post.frontmatter.title}</title>
    </Helmet>
    ...
  </>
}
```

## MarkdownファイルをHTMLファイルに変換する

`gatsby-transformer-remark`プラグインを導入します。

```bash
yarn add gatsby-transformer-remark
```

`gatsby-config.js`に次のコードを追加します。

```javascript
module.exports = {
  plugins: [
      `gatsby-transformer-remark`,
  ],
}
```

プラグインを導入することで、GraqhQLからMarkdownファイルを検索して調べる事ができるようになります。

```graphql
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
```

## Markdownファイル内のImageファイルを表示する

Markdownファイル内で指定された画像ファイルは、`gatsby-transformer-remark`プラグインだけでは表示されません。
`gatsby-remark-images`プラグインを導入することで読み込めるようにします。

<https://www.gatsbyjs.org/packages/gatsby-remark-images/>

まず、ライブラリをインストールします。

```bash
yarn add gatsby-remark-images gatsby-plugin-sharp
```

`gatsby-config.js`ファイル内で以下を設定します。
`maxWidth`は表示する画像ファイルの最大幅を指定します。

ちなみに対応しているImageファイルのフォーマットは

* JPEG
* PNG

だけなので、注意です。

```javascript
// In your gatsby-config.js
plugins: [
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 590,
          },
        },
      ],
    },
  },
]
```

## Markdownファイルの見出しを生成する

prismjsの後に宣言する必要がある。

<https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/>

```bash
yarn add gatsby-remark-autolink-headers
```

## シンタックスハイライトをつける

Markdownファイルのソースコード部分に、シンタックスハイライトをつけることができます。

<https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/>

まずは、こちらのPrismJSの公式サイトから、プレビューを見て好みのテーマを探しましょう。

<https://prismjs.com/>

続いて、好きなテーマを導入してみましょう。以下で、各テーマのCSSファイル名がわかるので確認しておきます。

<https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes>

```bash
yarn add gatsby-remark-prismjs prismjs
```

`gatsby-browser.js`に以下を追加しましょう。ここでは、`TOMORROW NIGHT`を使ってみます。

```js
require("prismjs/themes/prism-tomorrow.css")
```

## コードタイトルを追加する

```bash
yarn add -D gatsby-remark-code-titles
```

## GraphQL

### ブログの目次を作る

`value`が目次、`depth`は見出しの大きさ（H1, H2, H3とか）のこと。

```graphql
{
  markdownRemark(fields: { slug: { eq: "/2019/first-post/" } }) {
    id
    headings{
      value
      depth
    }
    fields{
      slug
    }
  }
}
```

```json
{
  "data": {
    "markdownRemark": {
      "id": "ff34f383-8e24-57c0-a39a-488a2dba24e9",
      "headings": [
        {
          "value": "Gatsby typographyプラグインを導入する",
          "depth": 2
        },
        {
          "value": "emotion",
          "depth": 2
        },
        {
          "value": "StaticQuery",
          "depth": 2
        },
        {
          "value": "MarkdownファイルをHTMLファイルに変換する",
          "depth": 2
        },
        {
          "value": "Markdownファイル内のImageファイルを表示する",
          "depth": 2
        },
        {
          "value": "Markdownファイルの見出しを生成する",
          "depth": 2
        },
        {
          "value": "シンタックスハイライトをつける",
          "depth": 2
        },
        {
          "value": "コードタイトルを追加する",
          "depth": 2
        },
        {
          "value": "GraphQL",
          "depth": 2
        },
        {
          "value": "ブログの目次を作る",
          "depth": 3
        }
      ],
      "fields": {
        "slug": "/2019/first-post/"
      }
    }
  }
}
```

```js
<ul>
  {headerList.map(({ value, link, depth }, index) => (
    <li
    key={index}
    css={css`
        margin-left: ${(depth - 2) * 12}px;
        &:hover {
        border-radius: 5px;
        background-color: lightyellow;
        }
    `}
    >
    <Link to={`${blogLink}#${link}`}>{value}</Link>
    {/* <small>{depth}</small> */}
    </li>
  ))}
</ul>
```

### スクロールに合わせて目次を追従させる

```bash
yarn add lodash
```

## GraphQLでブログの前後のページを取得

```graphql
{
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        prev{
          frontmatter{
            title
          }
        }
        next{
          frontmatter{
            title
          }
        }
        node {
          id
          frontmatter {
            title
            date: date(formatString: "MM/DD")
            year: date(formatString: "YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
}
```