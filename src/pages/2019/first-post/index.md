---
title: Gatsbyでブログを作る
date: '2019-04-11'
---

## Gatsby typographyプラグインを導入する

`gatsby-plugin-typography`を使うことでフォントの設定をすることができます。

```javascript
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