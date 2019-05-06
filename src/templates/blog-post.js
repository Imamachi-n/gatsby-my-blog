import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"

import Layout from "../components/layout/layout"
import BlogTOC from "../components/layout/blog-toc"
import SNSShare from "../components/SNSShare/index"

const mainStyle = css`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 15px;

  position: relative;
  padding: 4px;
  margin-bottom: 10px;
  display: flex;
`

const contentStyle = css`
  width: 75%;
  // width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const indexStyle = css`
  width: 20%;
  margin-top: 15px;
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
    font-size: 2.2rem;
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
    text-transform: none;
    margin: 1.75rem 0;
    padding: 0;
    color: inherit;
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 1.8rem;
    border-bottom: 1px solid #ddd;
  }
  h2 {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
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
  code,
  span {
    font-size: 13px;
    line-height: 1.5;
    letter-spacing: 0;
  }
  .language-text {
    border-radius: 3px;
    background: whitesmoke;
    color: currentColor;
  }
  pre {
    border-radius: 3px;
  }
  a {
    &:hover {
      color: #dda520;
      opacity: 1;
      box-shadow: 0 1px 0 0 currentColor;
    }
  }
`
const tagStyle = css`
  margin-top: 10px;
  margin-left: 100px;
  p {
    color: white;
    padding: 0 5px;
    font-size: 13px;
    font-weight: 700;
    margin-right: 10px;
    margin-bottom: 6px;
    display: inline-block;
    border: solid 1.5px #196989;
    border-radius: 3px;
    background: #196989;
    &:hover {
      color: #ffd97a;
    }
  }
`
const eachTagStyle = css`
  display: inline-block;
`
const prevStyle = css`
  p {
    float: right;
  }
`
const nextStyle = css`
  p {
    float: left;
  }
`

export default props => {
  const post = props.data.currentRemarkPost
  const { prev, next } = props.pageContext

  // A list for the table of blog contents
  const tocLinks = post.headings.map(({ value, depth }) => {
    return {
      value: value,
      link: value.replace(" ", "-").toLowerCase(),
      depth: depth,
    }
  })

  // A list for the tags
  const tagLinks = post.frontmatter.tags.map(tag => {
    return {
      name: tag,
      link: "/tags/" + tag.replace(" ", "-").toLowerCase(),
    }
  })

  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>

      <Layout>
        <div css={mainStyle}>
          {/* Left: Share button column */}
          <SNSShare title={post.frontmatter.title} link={post.fields.slug} />

          {/* Center: Content column */}
          <div css={contentStyle}>
            <div css={titleStyle}>
              <div css={dateStyle}>
                {post.frontmatter.date}
                <span>{post.frontmatter.year}</span>
              </div>
              <h1>{post.frontmatter.title}</h1>
            </div>

            <div css={tagStyle}>
              {tagLinks.map((tag, index) => (
                <div key={index} css={eachTagStyle}>
                  <Link to={tag.link}>
                    <p>{tag.name}</p>
                  </Link>
                </div>
              ))}
            </div>

            <div
              css={markdownStyle}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <div css={prevStyle}>
              {prev && (
                <Link to={prev.node.fields.slug}>
                  <p>前のページへ</p>
                </Link>
              )}
            </div>

            <div css={nextStyle}>
              {next && (
                <Link to={next.node.fields.slug}>
                  <p>次のページへ</p>
                </Link>
              )}
            </div>
          </div>

          {/* Right: Index column */}
          <div css={indexStyle}>
            <BlogTOC headerList={tocLinks} blogLink={post.fields.slug} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    currentRemarkPost: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date: date(formatString: "MM/DD")
        year: date(formatString: "YYYY")
        tags
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
