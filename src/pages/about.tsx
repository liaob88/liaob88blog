import { graphql } from "gatsby"
import React from "react"
import { AboutPageDataQuery } from "../../gatsby-graphql"
import ArticleContent from "../shared/components/ArticleContent"
import Layout from "../shared/components/Layout"
import SEO from "../shared/components/seo"

export const query = graphql`
  query AboutPageData {
    markdownRemark(
      fileAbsolutePath: { regex: "/pages/" }
      frontmatter: { title: { eq: "About Me" } }
    ) {
      frontmatter {
        title
        date
        tags
      }
      html
    }
  }
`

const AboutPage: React.FC<{ data: AboutPageDataQuery }> = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO title="about" />
      <ArticleContent html={html} post={frontmatter} />
    </Layout>
  )
}

export default AboutPage
