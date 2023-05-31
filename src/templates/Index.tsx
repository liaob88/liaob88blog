import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import { IndexPageDataQuery, SitePageContext } from "../../gatsby-graphql"
import BlogList from "../shared/components/BlogList"
import Layout from "../shared/components/Layout"
import { Pagination } from "../shared/components/Pagination/Pagination"
import SEO from "../shared/components/seo"

type IndexPageProps = {
  data: IndexPageDataQuery
  pageContext: SitePageContext
}

export const query = graphql`
  query IndexPageData($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blogs/" } }
      sort: { frontmatter: { date: DESC } }
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
      <BlogListWrapper>
        <BlogList posts={posts} />
      </BlogListWrapper>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

const BlogListWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 2rem;
`

export default IndexPage
