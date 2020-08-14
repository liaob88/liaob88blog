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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="contents-wrapper">
        <main>{children}</main>
      </div>
      <footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org"> Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
