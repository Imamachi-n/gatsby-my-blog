import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const indexStyle = css`
  margin-left: 1rem;
  margin-top: 1rem;
  font-size: 14px;
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 0rem;
    letter-spacing: 0; // 幅が狭いので詰め詰めにする
  }
`
const listStyle = css`
  padding-left: 3px;
  &:hover {
    border-radius: 3px;
    background-color: #ffd97a;
  }
`

const BlogTOC = ({ headerList, blogLink }) => (
  <>
    <div css={indexStyle}>
      <ul>
        {headerList.map(({ value, link, depth }, index) => (
          <li
            key={index}
            css={css`
              margin-left: ${(depth - 2) * 12}px;
              ${listStyle};
            `}
          >
            <Link to={`${blogLink}#${link}`}>{value}</Link>
          </li>
        ))}
      </ul>
    </div>
  </>
)

export default BlogTOC
