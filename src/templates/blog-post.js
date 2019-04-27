import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout/layout"
import BlogTOC from "../components/layout/blog-toc"

export default ({ data }) => {
  const post = data.markdownRemark
  // A list for the table of blog contents
  const linkLists = post.headings.map(({ value, depth }) => {
    return {
      value: value,
      link: value.replace(" ", "-").toLowerCase(),
      depth: depth,
    }
  })
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
          code {
            font-size: 13px;
          }
        `}
      >
        <BlogTOC headerList={linkLists} blogLink={post.fields.slug} />
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
      headings {
        value
        depth
      }
      fields {
        slug
      }
    }
  }
`
