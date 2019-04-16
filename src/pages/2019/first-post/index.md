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

```bash
yarn add @emotion/core
```

## StaticQuery

Gatsby v2から導入された新しいAPI。Pageコンポーネントで使われているGraphQLタグは、Pageコンポーネント以外では使用できなかった。StaticQueryを利用することで、Layoutコンポーネントのように、PageコンポーネントでないコンポーネントでもGraphQLが利用できる。

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

`gatsby-config.js`ファイルに以下の内容が記載されいる場合を想定する。

```javascript
module.exports = {
  siteMetadata: {
    title: `Imamachi-n blog`,
  },
}
```

`gatsby develop`コマンドを実行後、`http://localhost:8000/___graphql`のURLにアクセスし、以下のクエリを実行してみる。

```graphql
query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
    }
```

すると、以下の結果が得られるはず。
```
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