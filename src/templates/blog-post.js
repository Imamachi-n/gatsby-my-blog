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
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const indexStyle = css`
  width: 20%;
  @media (max-width: 600px) {
    display: none;
    width: 0%;
  }
`
const dateStyle = css`
  position: absolute;
  top: 0;
  padding-top: 10px;
  margin: 2.5rem 0;

  background: #196989;
  border-radius: 50%;
  color: white;
  width: 80px;
  height: 80px;
  text-align: center;
  font-size: 1.2rem;

  span {
    display: block;
    border-top: 1px rgba(255, 255, 255, 0.5) solid;
    font-size: 0.8rem;
    padding-top: 3px;
    margin 0 auto;
    width: 60%;
  }
`
const titleStyle = css`
  h1 {
    margin: 0 auto;
    margin-top: 30px;
    margin-left: 100px;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.4;
    font-feature-settings: "palt";
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  }
`
const markdownStyle = css`
  h1 {
    margin-top: 3.5rem;
    text-transform: none;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    color: inherit;
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 1.8rem;
    border-bottom: 1px solid #ddd;
  }
  h3 {
    margin-top: 0px;
    margin-bottom: 20px;
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
            <div css={titleStyle}>
              <div css={dateStyle}>
                {post.frontmatter.date}
                <span>{post.frontmatter.year}</span>
              </div>
              <h1>{post.frontmatter.title}</h1>
            </div>

            <div
              css={markdownStyle}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
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
