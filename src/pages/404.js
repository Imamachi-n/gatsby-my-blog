import React from "react"
import { css } from "@emotion/core"
import { Browser } from "react-kawaii"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const mainStyle = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 15px;
  h1 {
    margin: 20px 0 0 0;
    padding: 0 10px 0 20px;
  }
  p {
    padding: 0 10px 0 20px;
  }
`

const svgStyle = css`
  margin-top: 30px;
  margin-left: 50px;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div css={mainStyle}>
      <h1>NOT FOUND...</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <div css={svgStyle}>
        <Browser size={200} mood="shocked" color="#72ceff" />
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
