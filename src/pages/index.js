import React from "react"
// import "minireset.css"
import { css } from "@emotion/core"

import Layout from "../components/layout/layout"
import Bloglist from "../components/layout/blog-list"
import SEO from "../components/seo"

const characterColor = css`
  color: #196989;
`

const titleStyle = css`
  margin: 20px 0;
  padding: 0 10px 0 20px;
  display: inline-block;
  border-left: solid 15px currentColor;
  border-bottom: solid 3px currentColor;
  line-height: 1.5;
  ${characterColor};
`

export default () => {
  return (
    <Layout>
      <div>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1 css={titleStyle}>Blog Top</h1>
        <Bloglist />
      </div>
    </Layout>
  )
}
