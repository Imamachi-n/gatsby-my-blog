import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import { rhythm } from "../../utils/typography"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      css={css`
        margin: 0;
        max-width: 700px;
      `}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
    </div>
  </header>
)

export default Header
