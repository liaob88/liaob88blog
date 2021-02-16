import { graphql } from "gatsby"
import moment from "moment"
import React from "react"
import styled from "styled-components"
import { PostDataQuery, SitePageContext } from "../../gatsby-graphql"
import Layout from "../shared/components/Layout"
import SEO from "../shared/components/seo"
import Tags from "../shared/components/Tags"
import { TagsWrapper } from "../shared/Styles"
import { PostPagePagination } from "../shared/components/Pagination/PostPagePagination"

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
      <PostPageWrapper>
        <time>
          作成日: {moment(post.frontmatter.date).format(`MM.DD.YYYY`)}
        </time>
        <h1>{post.frontmatter.title}</h1>
        <TagsWrapper $bottomSpace={true}>
          <Tags tags={post.frontmatter.tags} />
        </TagsWrapper>
        <PostContentsWrapper dangerouslySetInnerHTML={{ __html: post.html }} />
        <PostPagePagination previous={previous} next={next} />
      </PostPageWrapper>
    </Layout>
  )
}

const PostPageWrapper = styled.div`
  p,
  li {
    font-size: 0.9em;
  }
  padding: 0 1rem;
  time {
    display: block;
    text-align: end;
    margin-bottom: 1rem;
  }
`

const PostContentsWrapper = styled.div`
  border-bottom: 1px dotted;
  h2 {
    border-left: 5px solid coral;
    padding-left: 15px;
  }
  h3 {
    border-bottom: 5px double coral;
    display: inline-block;
  }
  a {
    color: inherit;
  }
`

export default PostPage
