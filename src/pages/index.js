import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout/layout"
import { rhythm } from "../utils/typography"
import SEO from "../components/seo"

export default ({ data }) => {
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
        {/* <h4
          css={css`
            margin-top: ${rhythm(1)};
          `}
        >
          {data.allMarkdownRemark.totalCount} Posts
        </h4> */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  // margin-top: ${rhythm(1 / 2)};
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
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
