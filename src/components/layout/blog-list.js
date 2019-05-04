import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { rhythm } from "../../utils/typography"
import { css } from "@emotion/core"

const itemStyle = css`
  &:hover {
    border-radius: 5px;
    background-color: aliceblue;
  }
`

const linkStyle = css`
  text-decoration: none;
  color: inherit;
`

const titleStyle = css`
  margin: ${rhythm(1 / 4)} 0;
`
const dateStyle = css`
  color: #bbb;
`

const Bloglist = () => (
  <StaticQuery
    query={query}
    render={data => (
      <>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <div css={itemStyle}>
              <Link to={node.fields.slug} css={linkStyle}>
                <h3 css={titleStyle}>
                  {node.frontmatter.title}{" "}
                  <span css={dateStyle}>— {node.frontmatter.date}</span>
                </h3>
                <p>{node.excerpt}</p>
              </Link>
            </div>
            <hr />
          </div>
        ))}
      </>
    )}
  />
)

export default Bloglist

const query = graphql`
  query MarkdownList {
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
