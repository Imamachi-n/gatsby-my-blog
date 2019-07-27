import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const mainStyle = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 15px;
`

const SecondPage = () => (
  <Layout>
    <div css={mainStyle}>
      <SEO title="Page two" />
      <h1>Under Construction</h1>
      <p>....</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </Layout>
)

export default SecondPage
