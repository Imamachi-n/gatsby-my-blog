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

// My custom components
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
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
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
