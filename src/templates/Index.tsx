import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import BlogList from "../shared/components/BlogList"
import Layout from "../shared/components/Layout"
import SEO from "../shared/components/seo"
import { Pagination } from "../shared/components/Pagination/Pagination"
import { IndexPageDataQuery, SitePageContext } from "../../gatsby-graphql"

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

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Posts</h1>
      <BlogListWrapper>
        <BlogList posts={posts} />
      </BlogListWrapper>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

const BlogListWrapper = styled.div`
  margin-bottom: 2rem;
`

export default IndexPage
