import { graphql, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { SiteTitleQuery } from "../../gatsby-graphql"
import Header from "./header"
import "./layout.css"

const Layout: React.FC<ReactNode> = ({ children }) => {
  const data: SiteTitleQuery = useStaticQuery(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="contents-wrapper">
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="main-wrapper">
        <main>{children}</main>
      </div>
      <footer>©liaob88 {new Date().getFullYear()}. All Rights Reserved</footer>
    </div>
  )
}

export default Layout
