import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Itemlist from "./item-list"

const BloglistDev = () => (
  <StaticQuery
    query={query}
    render={data => <Itemlist posts={data.allMarkdownRemark.edges} />}
  />
)

export default BloglistDev

const query = graphql`
  query MarkdownListDev {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date: date(formatString: "MM/DD")
            year: date(formatString: "YYYY")
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
