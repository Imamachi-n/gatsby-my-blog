import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"

import Layout from "../components/layout/layout"
import Itemlist from "../components/layout/item-list"

const characterColor = css`
  color: #196989;
`

const mainStyle = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 15px;
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

export default props => {
  const posts =
    process.env.NODE_ENV === `development`
      ? props.data.filteredRemarkPostsDev
      : props.data.filteredRemarkPostsProd

  return (
    <>
      <Helmet>
        <title>{`${props.data.site.siteMetadata.title} | ${
          props.pageContext.tag
        }`}</title>
      </Helmet>

      <Layout>
        <div css={mainStyle}>
          <h2 css={titleStyle}>
            {props.pageContext.tag}に関連するブログ記事 : {posts.totalCount}件
          </h2>
          <Itemlist posts={posts.edges} />
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }

    filteredRemarkPostsProd: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag], nin: ["WIP"] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date: date(formatString: "MM/DD")
            year: date(formatString: "YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }

    filteredRemarkPostsDev: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date: date(formatString: "MM/DD")
            year: date(formatString: "YYYY")
            tags
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
