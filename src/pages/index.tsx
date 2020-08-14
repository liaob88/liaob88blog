import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import Tags from "../components/Tags"
import { IndexPageDataQuery } from "../../gatsby-graphql"

type IndexPageData = {
  data: IndexPageDataQuery
}

export const query = graphql`
  query IndexPageData {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "ll")
            description
            slug
            tags
          }
        }
      }
    }
  }
`

const IndexPage: React.FC<IndexPageData> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="text-align-center">Posts</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        const { frontmatter } = node
        const { slug, title, date, tags, description } = frontmatter
        return (
          <article key={slug}>
            <div className="article-contents">
              <h2 className="article-title">
                <Link to={`/${slug}`}>{title}</Link>
              </h2>
              <p className="article-description">{description}</p>
              <div className="article-info">
                <div className="tags-wrapper">
                  <Tags tags={tags} />
                </div>
                <time className="index-time" dateTime={date}>
                  {date}
                </time>
              </div>
            </div>
          </article>
        )
      })}
    </Layout>
  )
}

export default IndexPage
