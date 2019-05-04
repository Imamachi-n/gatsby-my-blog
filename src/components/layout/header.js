import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const CharacterColor = css`
  color: white;
`

const headerBase = css`
  background: #196989;
  padding: ${rhythm(2)};
  padding-top: ${rhythm(1.5)};
`

const header = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 15px;
  color: white;
  h3 {
    ${CharacterColor};
    margin: 0;
  }
  nav {
    margin-left: auto;
  }
  h4 {
    ${CharacterColor};
    margin: 0;
    padding: 0 10px;
    display: inline-block;
  }
`

const title = css`
  h1,
  p {
    ${CharacterColor};
    margin-bottom: 0;
    font-style: normal;
    text-align: center;
  }
`

const Header = ({ siteTitle }) => (
  <div css={headerBase}>
    <header css={header}>
      <h3>Private Blog</h3>
      <nav>
        <Link to={`/about/`}>
          <h4>About</h4>
        </Link>
        <Link to={`/about/`}>
          <h4>Works</h4>
        </Link>
      </nav>
    </header>

    <div css={title}>
      <Link to={`/`}>
        <h1>{siteTitle}</h1>
        <p>JavaScript, React, Java, Spring Framework, etc...</p>
      </Link>
    </div>
  </div>
)

export default Header
