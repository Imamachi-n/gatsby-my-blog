import React from "react"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faGetPocket } from "@fortawesome/free-brands-svg-icons"

const ulStyle = css`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: 50px;
    }
  }
  li {
    display: inline-block;
    // margin: 0 8px;
    
    svg{
      opacity: 0.5;
    }

    &:first-of-type {
      margin-left: 0;
    }
    
    & svg:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`

const SNSShare = ({ title, link }) => {
  // link = "https://github.com/Imamachi-n"
  return (
    <div css={ulStyle}>
      <ul>
        <Helmet>
          <script
            type="text/javascript"
            src="//b.st-hatena.com/js/bookmark_button.js"
            charset="utf-8"
            async="async"
          />
          <script
            type="text/javascript"
            src="//widgets.getpocket.com/v1/j/btn.js?v=1"
            charset="utf-8"
            async="async"
          />
        </Helmet>

        {/* Fackbook */}
        <li>
          <FacebookShareButton url={link}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>
        </li>

        {/* Twitter */}
        <li>
          <TwitterShareButton title={title} url={link}>
            <TwitterIcon size={35} round />
          </TwitterShareButton>
        </li>

        {/* LinkedIn */}
        <li>
          <LinkedinShareButton url={link}>
            <LinkedinIcon title={title} size={35} round />
          </LinkedinShareButton>
        </li>

        {/* Pocket */}
        {/* <li>
          <a
            aria-label="share_pocket"
            href={`https://getpocket.com/edit?url=${link}&title=${title}`}
            onClick={`window.open(this.href, 'PCwindow', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes'); return false;`}
          >
            <FontAwesomeIcon color="gray" icon={faGetPocket} />
          </a>
        </li> */}
      </ul>
    </div>
  )
}

export default SNSShare
