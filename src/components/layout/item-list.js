import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { css } from "@emotion/core"

const postStyle = css`
  position: relative;
  padding: 4px;
  margin-bottom: 10px;
  border: solid 2px #196989;
  border-radius: 5px;

  &:hover {
    border-radius: 5px;
    background-color: #eff9ff;
  }
`

const dateStyle = css`
  position: absolute;
  top: 0;
  padding-top: 10px;
  margin: 0.4375rem 0;

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

const linkStyle = css`
  h3,
  p {
    margin-left: 100px;
  }
  p {
    color: slategray;
  }
  text-decoration: none;
  color: inherit;
`

const titleStyle = css`
  margin: ${rhythm(1 / 4)} 0;
`

const Itemlist = ({ posts }) => (
  <article>
    {posts.map(({ node }) => (
      <div key={node.id}>
        <div css={postStyle}>
          <div css={dateStyle}>
            {node.frontmatter.date} <span> {node.frontmatter.year} </span>
          </div>
          <Link to={node.fields.slug} css={linkStyle}>
            <h3 css={titleStyle}> {node.frontmatter.title} </h3>
            <p> {node.excerpt} </p>
          </Link>
        </div>
      </div>
    ))}
  </article>
)

export default Itemlist
