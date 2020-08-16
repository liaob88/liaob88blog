import { graphql } from "gatsby";
import React from "react";
import { PostDataQuery, SitePageContext } from "../../gatsby-graphql";
import Layout from "../components/layout";
import { BlogPagePagination } from "../components/PageNation";
import Tags from "../components/Tags";

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
        date(formatString: "ll")
      }
    }
  }
`

const PostPage: React.FC<PostData> = ({ data, pageContext }) => {
  const { previous, next } = pageContext

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
        <div
          className="post-page-contents"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <BlogPagePagination previous={previous} next={next} />
      </div>
    </Layout>
  )
}

export default PostPage
