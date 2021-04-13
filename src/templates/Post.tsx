import { graphql } from "gatsby"
import React from "react"
import { PostPageDataQuery, SitePageContext } from "../../gatsby-graphql"
import ArticleContent from "../shared/components/ArticleContent"
import Layout from "../shared/components/Layout"
import { PostPagePagination } from "../shared/components/Pagination/PostPagePagination"
import SEO from "../shared/components/seo"

type PostData = {
  data: PostPageDataQuery
  pageContext: SitePageContext
}

export const query = graphql`
  query PostPageData($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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

const PostPage: React.FC<PostData> = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const { frontmatter, html, fields } = data.markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <ArticleContent
        html={html}
        post={frontmatter}
        modifiedAt={fields.latestModifiedAt}
      />
      <PostPagePagination previous={previous} next={next} />
    </Layout>
  )
}

export default PostPage
