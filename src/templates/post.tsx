import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Tags from "../components/Tags"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="post-page-wrapper">
        <div className="post-page-info">
          <time>{post.frontmatter.date}</time>
          <div className="tags-wrapper">
            <Tags tags={post.frontmatter.tags} />
          </div>
        </div>
        <h1>{post.frontmatter.title}</h1>
        <div className="post-page-contents" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        date(formatString: "ll")
      }
    }
  }
`
