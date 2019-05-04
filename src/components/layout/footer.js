import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const backgroundColor = css`
  background: #196989;
`
const characterColor = css`
  color: white;
`

const footerBase = css`
  ${backgroundColor};
  padding: ${rhythm(1.2)};
  padding-top: ${rhythm(1.2)};
  a {
    ${characterColor};
  }
`

const footer = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 15px;
`

const Footer = () => (
  <div css={footerBase}>
    <footer css={footer}>
      Copyright © {new Date().getFullYear()}.{` `}
      <a href="https://github.com/Imamachi-n">Naoto Imamachi</a>
    </footer>
  </div>
)

export default Footer
