import { graphql } from "gatsby"
import React from "react"
import { SitePageContext, TagsPageDataQuery } from "../../gatsby-graphql"
import BlogListItem from "../components/BlogListItem"
import Layout from "../components/layout"
import { Pagination } from "../components/Pagination"
import SEO from "../components/seo"

export const query = graphql`
  query TagsPageData($tag: String, $skip: Int!, $limit: Int!) {
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
  data: TagsPageDataQuery
  pageContext: SitePageContext
}

const TagPage: React.FC<TagPageProps> = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  const { tag, currentPage, numTagPages, totalCount } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numTagPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <Layout>
      <SEO title={tag} />
      <div>
        <h2 className="text-align-center">"{tag}"</h2>
        <p className="text-align-center">{totalCount} posts</p>
        <BlogListItem posts={posts} />
        <Pagination
          isFirst={isFirst}
          isLast={isLast}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          numPages={numTagPages}
        />
      </div>
    </Layout>
  )
}

export default TagPage
