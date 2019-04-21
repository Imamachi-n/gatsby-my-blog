import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background: #3e91c8;
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 1080px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Link to={`/`}>
        <h1
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
            color: white;
            text-align: center;
          `}
        >
          {siteTitle}
        </h1>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        <h3
          css={css`
            margin: 0px 10px 0px 10px;
            color: white;
          `}
        >
          Portfolio
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        <h3
          css={css`
            margin: 0px 10px 0px 10px;
            color: white;
          `}
        >
          About
        </h3>
      </Link>
    </div>
  </header>
)

export default Header
