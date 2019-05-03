import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"
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
    <>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>

      <Layout>
        <div
          css={css`
            display: flex;
            align-items: stretch;
          `}
        >
          <div
            css={css`
              flex: 1;
              width: 800px;
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
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <div
            css={css`
              width: 250px;
            `}
          >
            <BlogTOC headerList={linkLists} blogLink={post.fields.slug} />
          </div>
        </div>
      </Layout>
    </>
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
