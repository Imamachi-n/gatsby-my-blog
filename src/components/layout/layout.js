/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"

import Header from "./header"
import Footer from "./footer"

const blogList = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const mainStyle = css`
  margin: 0px auto;
  max-width: 1080px;
  padding: 0px 1.0875rem 2.45rem;
  padding-top: 0;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={blogList}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div css={mainStyle}>
          <main>{children}</main>
        </div>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
