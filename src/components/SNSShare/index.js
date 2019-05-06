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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGetPocket } from "@fortawesome/free-brands-svg-icons"

const ulStyle = css`
  width: 5%;
  @media (max-width: 600px) {
    display: none;
    width: 0%;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: 50px;
  }
`

const SNSShare = ({ title, link }) => {
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
          <FacebookShareButton
            additionalProps={{ "aria-label": "share_facebook" }}
            url={link}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </li>

        {/* Twitter */}
        <li>
          <TwitterShareButton
            additionalProps={{ "aria-label": "share_twitter" }}
            title={title}
            url={link}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </li>

        {/* LinkedIn */}
        <li>
          <LinkedinShareButton
            additionalProps={{ "aria-label": "share_linkedin" }}
            url={link}
          >
            <LinkedinIcon title={title} size={32} round />
          </LinkedinShareButton>
        </li>

        {/* Pocket */}
        <li>
          <a
            aria-label="share_pocket"
            href={`https://getpocket.com/edit?url=${link}&title=${title}`}
            onClick={`window.open(this.href, 'PCwindow', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes'); return false;`}
          >
            <FontAwesomeIcon color="gray" icon={faGetPocket} />
          </a>
        </li>

        {/* Hatena */}
        {/* <li>
        <a
          aria-label="share_hatena-bookmark"
          href="http://b.hatena.ne.jp/entry/"
          data-hatena-bookmark-layout="touch-counter"
          title="このエントリーをはてなブックマークに追加"
          style={{ boxShadow: "none" }}
        >
          <img
            src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="24"
            height="24"
            style={{ border: "none" }}
          />
        </a>
      </li> */}
      </ul>
    </div>
  )
}

export default SNSShare
