import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const BlogTOC = ({ headerList, blogLink }) => (
  <>
    <div
      css={css`
        margin-left: 1rem;
        margin-top: 1rem;
        ul {
          list-style: none;
        }
        li {
          margin-bottom: 0rem;
          letter-spacing: 0; // 幅が狭いので詰め詰めにする
        }
      `}
    >
      <ul>
        {headerList.map(({ value, link, depth }, index) => (
          <li
            key={index}
            style={{ marginLeft: `${(depth - 2) * 12}px` }}
            css={css`
              &:hover {
                border-radius: 5px;
                background-color: lightyellow;
              }
            `}
          >
            <Link to={`${blogLink}#${link}`}>{value}</Link>
            {/* <small>{depth}</small> */}
          </li>
        ))}
      </ul>
    </div>
  </>
)

export default BlogTOC
