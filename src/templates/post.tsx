import { graphql } from "gatsby"
import moment from "moment"
import React from "react"
import { PostDataQuery, SitePageContext } from "../../gatsby-graphql"
import Layout from "../components/layout"
import { PostPagePagination } from "../components/Pagination"
import SEO from "../components/seo"
import Tags from "../components/Tags"

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

  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="post-page-wrapper">
        <time>作成日: {moment(post.frontmatter.date).format(`MM.DD.YYYY`)}</time>
        <h1>{post.frontmatter.title}</h1>
        <div className="post-page-info">
          <div className="tags-wrapper">
            <Tags tags={post.frontmatter.tags} />
          </div>
        </div>
        <div
          className="post-page-contents"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <PostPagePagination previous={previous} next={next} />
      </div>
    </Layout>
  )
}

export default PostPage
