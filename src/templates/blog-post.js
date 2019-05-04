import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/layout"
import BlogTOC from "../components/layout/blog-toc"

const mainStyle = css`
  position: relative;
  padding: 4px;
  margin-bottom: 10px;
  display: flex;
`
const contentStyle = css`
  flex: 1;
  width: 80%;
  h1 {
    margin: 0;
    margin-top: 30px;
    margin-left: 120px;
    font-size: 40px;
  }
  ul,
  ol {
    margin-left: 1.44rem;
    margin-bottom: 1.08rem;
  }
  li {
    margin-bottom: 0.5rem;
  }
  code {
    font-size: 12px;
    line-height: 12px;
  }
`
const indexStyle = css`
  width: 20%;
`
const dateStyle = css`
  position: absolute;
  top: 0;
  padding-top: 10px;
  margin: 20px 0;

  background: #196989;
  border-radius: 50%;
  color: white;
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 1.625rem;

  span {
    display: block;
    border-top: 1px rgba(255, 255, 255, 0.5) solid;
    font-size: 1rem;
    padding-top: 3px;
    margin 0 auto;
    width: 60%;
  }
`

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
        <div css={mainStyle}>
          <div css={contentStyle}>
            <div css={dateStyle}>
              {post.frontmatter.date}
              <span>{post.frontmatter.year}</span>
            </div>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <div css={indexStyle}>
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
        date: date(formatString: "MM/DD")
        year: date(formatString: "YYYY")
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
