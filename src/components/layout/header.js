import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const headerBase = css`
  background: #3e91c8;
  padding: ${rhythm(2)};
  padding-top: ${rhythm(1.5)};
`
const CharacterColor = css`
  color: white;
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
`
const headerH1 = css`
  ${CharacterColor};
  margin: 0;
`
const headerNav = css`
  margin-left: auto;
`
const headerLink = css`
  ${CharacterColor};
  margin: 0;
  padding: 0 10px;
  display: inline-block;
`
const title = css`
  margin-bottom: 0;
  font-style: normal;
  color: white;
  text-align: center;
`

const Header = ({ siteTitle }) => (
  <div css={headerBase}>
    <header css={header}>
      <h3 css={headerH1}>Private Blog</h3>
      <nav css={headerNav}>
        <Link to={`/about/`}>
          <h4 css={headerLink}>About</h4>
        </Link>
        <Link to={`/about/`}>
          <h4 css={headerLink}>Works</h4>
        </Link>
      </nav>
    </header>

    <div>
      <Link to={`/`}>
        <h1 css={title}>{siteTitle}</h1>
        <p css={title}>JavaScript, React, Java, Spring Framework, etc...</p>
      </Link>
    </div>
  </div>
)

export default Header
