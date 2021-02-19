import { graphql } from "gatsby"
import React from "react"
import { PostDataQuery, SitePageContext } from "../../gatsby-graphql"
import ArticleContent from "../shared/components/ArticleContent"
import Layout from "../shared/components/Layout"
import { PostPagePagination } from "../shared/components/Pagination/PostPagePagination"
import SEO from "../shared/components/seo"

type PostData = {
  data: PostDataQuery
  pageContext: SitePageContext
}

export const query = graphql`
  query PostData($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        date
      }
    }
  }
`

const PostPage: React.FC<PostData> = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <ArticleContent html={html} post={frontmatter} />
      <PostPagePagination previous={previous} next={next} />
    </Layout>
  )
}

export default PostPage
