import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const BlogTOC = ({ headerList, blogLink }) => (
  <>
    <ul>
      {headerList.map(({ value, link, depth }, index) => (
        <li
          key={index}
          style={{ marginLeft: `${(depth - 2) * 12}px` }}
          css={css`
            &:hover {
              border-radius: 5px;
              background-color: aliceblue;
            }
          `}
        >
          <Link to={`${blogLink}#${link}`}>{value}</Link>
          {/* <small>{depth}</small> */}
        </li>
      ))}
    </ul>
  </>
)

export default BlogTOC
