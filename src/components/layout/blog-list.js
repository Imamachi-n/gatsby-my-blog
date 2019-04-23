import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { rhythm } from "../../utils/typography"
import { css } from "@emotion/core"

const Bloglist = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div>
            <div
              key={node.id}
              css={css`
                &:hover {
                  border-radius: 5px;
                  background-color: aliceblue;
                }
              `}
            >
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  css={css`
                    margin-top: ${rhythm(1 / 4)};
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
            <hr />
          </div>
        ))}
      </>
    )}
  />
)

export default Bloglist
