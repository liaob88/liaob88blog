import { useStaticQuery, graphql } from "gatsby"
import { SiteMetaDataQuery } from "../../../gatsby-graphql"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaDataQuery>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
  )
  return site.siteMetadata
}
