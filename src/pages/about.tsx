import { graphql } from "gatsby"
import React from "react"
import { AboutPageDataQuery } from "../../gatsby-graphql"
import ArticleContent from "../shared/components/ArticleContent"
import Layout from "../shared/components/Layout"
import SEO from "../shared/components/seo"
import moment from "moment"

export const query = graphql`
  query AboutPageData {
    markdownRemark(
      fileAbsolutePath: { regex: "/pages/" }
      frontmatter: { title: { eq: "About Me" } }
    ) {
      html
      frontmatter {
        title
        tags
        date
      }
      fields {
        latestModifiedAt
      }
    }
  }
`

const AboutPage: React.FC<{ data: AboutPageDataQuery }> = ({ data }) => {
  const { html, frontmatter, fields } = data.markdownRemark

  const { title, tags } = frontmatter

  const createdAt = moment(frontmatter.date).format(`MM.DD.YYYY`)
  const latestModifiedAt = fields.latestModifiedAt
    ? moment(fields.latestModifiedAt).format(`MM.DD.YYYY`)
    : null
  return (
    <Layout>
      <SEO title="about" />
      <ArticleContent
        html={html}
        title={title}
        tags={tags}
        latestModifiedAt={latestModifiedAt}
        createdAt={createdAt}
      />
    </Layout>
  )
}

export default AboutPage
