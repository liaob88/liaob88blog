import { useStaticQuery, graphql } from "gatsby"
import { SiteMetaDataQuery, SiteSiteMetadata } from "../../../gatsby-graphql"

export const useSiteMetadata = (): Pick<
  SiteSiteMetadata,
  "title" | "author"
> => {
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
