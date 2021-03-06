import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Itemlist from "./item-list"

const Bloglist = () => (
  <StaticQuery
    query={query}
    render={data => <Itemlist posts={data.allMarkdownRemark.edges} />}
  />
)

export default Bloglist

const query = graphql`
  query MarkdownList {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { nin: ["WIP"] } } }
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
