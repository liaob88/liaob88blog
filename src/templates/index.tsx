import { graphql } from "gatsby"
import React from "react"
import { IndexPageDataQuery, SitePageContext } from "../../gatsby-graphql"
import BlogListItem from "../components/BlogListItem"
import Layout from "../components/layout"
import { Pagination } from "../components/Pagination"
import SEO from "../components/seo"

type IndexPageProps = {
  data: IndexPageDataQuery
  pageContext: SitePageContext
}

export const query = graphql`
  query IndexPageData($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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

const IndexPage: React.FC<IndexPageProps> = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="text-align-center">Posts</h1>
      <BlogListItem posts={posts} />
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export default IndexPage
