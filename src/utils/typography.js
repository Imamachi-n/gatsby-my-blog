import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => ({
  "html,body,h1,h2,h3,h4,h5,h6": {
    color: "#444",
    fontFamily: [
      "-apple-system-body",
      "BlinkMacSystemFont",
      "Helvetica Neue",
      "Helvetica Sans",
      "Hiragino Kaku Gothic ProN",
      "Kosugi Maru",
      '"Noto Sans Japanese"',
      '"游ゴシック  Medium"',
      '"Yu Gothic Medium"',
      '"メイリオ"',
      "meiryo",
      "sans-serif",
    ].join(","),
    "-webkit-font-smoothing": "antialiased",
    fontKerning: "auto",
    fontVariantLigatures: "none",
    letterSpacing: ".05rem",
    lineHeight: "1.8",
  },
  "@media all and (-ms-high-contrast: none)": {
    html: {
      fontFamily: "Verdana, Meiryo, sans-serif",
    },
  },
  "@media all and (-ms-high-contrast: active)": {
    html: {
      fontFamily: "Verdana, Meiryo, sans-serif",
    },
  },
  "h1,h2,h3,h4,h5,h6": {
    textTransform: "none",
  },
  "h1 a,h2 a,h3 a,h4 a,h5 a,h6 a": {
    color: "#444",
  },
  h2: {
    fontSize: "1.6rem",
    borderBottom: "1px solid #ddd",
  },
  p: {
    marginBottom: "10px",
  },
  "html, body": {
    fontWeight: "500",
  },
  a: {
    boxShadow: "none",
    color: "#3f9ac8",
  },
  "a:hover": {
    opacity: "0.7",
    boxShadow: "0 1px 0 0 currentColor",
  },
  "a.gatsby-resp-image-link": {
    boxShadow: "none",
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale