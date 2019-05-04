import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const backgroundColor = css`
  background: #196989;
`
const characterColor = css`
  color: white;
`
const hover = css`
  &:hover {
    color: #ffd97a;
    opacity: 1;
    box-shadow: 0 2px 0 0 currentColor;
  }
`
const hoverTitle = css`
  &:hover {
    opacity: 0.7;
  }
`

const headerBase = css`
  ${backgroundColor};
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
  h3 {
    ${characterColor};
    margin: 0;
  }
  nav {
    margin-left: auto;
  }
  h4 {
    ${characterColor};
    margin: 0 10px;
    padding: 0;
    display: inline-block;
    ${hover};
  }
`

const title = css`
  h1,
  p {
    ${characterColor};
    margin-bottom: 0;
    font-style: normal;
    text-align: center;
  }
  h1 {
    ${hoverTitle};
  }
`

const Header = ({ siteTitle }) => (
  <div css={headerBase}>
    <header css={header}>
      <h3>Tech blog</h3>
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
        <p>JavaScript, React, Java, Spring Framework, AWS, etc...</p>
      </Link>
    </div>
  </div>
)

export default Header
