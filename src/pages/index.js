import React from "react"
// import "minireset.css"
import { css } from "@emotion/core"

import Layout from "../components/layout/layout"
import Bloglist from "../components/layout/blog-list"
import SEO from "../components/seo"

export default () => {
  return (
    <Layout>
      <div>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1
          css={css`
            margin-top: 26px;
          `}
        >
          Blog Top
        </h1>
        <Bloglist />
      </div>
    </Layout>
  )
}
