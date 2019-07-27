import React from "react"
// import "minireset.css"
import { css } from "@emotion/core"

import Layout from "../components/layout/layout"
import Bloglist from "../components/layout/blog-list"
import BloglistDev from "../components/layout/blog-list-dev"
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
const mainStyle = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 15px;
`

export default () => {
  return (
    <Layout>
      <div css={mainStyle}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1 css={titleStyle}> Blog Top </h1>
        {process.env.NODE_ENV === `development` ? (
          <BloglistDev />
        ) : (
          <Bloglist />
        )}
      </div>
    </Layout>
  )
}
