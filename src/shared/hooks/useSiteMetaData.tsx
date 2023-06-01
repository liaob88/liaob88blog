import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = (): Pick<
  Queries.SiteSiteMetadata,
  "title" | "author"
> => {
  const { site } = useStaticQuery<{
    site: { siteMetadata: Queries.SiteSiteMetadata }
  }>(
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
