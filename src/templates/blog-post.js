import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { css } from "@emotion/core"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div
        css={css`
          ul,
          ol {
            margin-left: 1.44rem;
            margin-bottom: 1.08rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
        `}
      >
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
