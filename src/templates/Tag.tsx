import { graphql } from "gatsby"
import React from "react"
import { SitePageContext, TagPageDataQuery } from "../../gatsby-graphql"
import BlogListItem from "../shared/components/BlogList"
import Layout from "../shared/components/Layout"
import { Pagination } from "../shared/components/Pagination/Pagination"
import SEO from "../shared/components/seo"

export const query = graphql`
  query TagPageData($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            slug
            tags
          }
        }
      }
    }
  }
`

interface TagPageProps {
  data: TagPageDataQuery
  pageContext: SitePageContext
}

const TagPage: React.FC<TagPageProps> = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  const { tag, currentPage, numTagPages, totalCount } = pageContext
  return (
    <Layout>
      <SEO title={tag} />
      <h1>"{tag}"</h1>
      <p style={{ textAlign: "center" }}>{totalCount} posts</p>
      <BlogListItem posts={posts} />
      <Pagination currentPage={currentPage} numPages={numTagPages} />
    </Layout>
  )
}

export default TagPage
