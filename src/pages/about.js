import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Under Construction</h1>
    <p>....</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
