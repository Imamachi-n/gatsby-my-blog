import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"

const Footer = () => (
  <footer
    css={css`
      background: #196989;
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
      Copyright © {new Date().getFullYear()}.{` `}
      <a
        href="https://github.com/Imamachi-n"
        css={css`
          color: white;
        `}
      >
        Naoto Imamachi
      </a>
    </div>
  </footer>
)

export default Footer
