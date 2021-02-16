import { Link } from "gatsby"
import moment from "moment"
import React, { Fragment } from "react"
import { MarkdownRemarkFrontmatter, Maybe } from "../../../gatsby-graphql"
import Tags from "./Tags"
import styled from "styled-components"
import { TagsWrapper } from "../Styles"

type BlogListItemProps = {
  posts: {
    node: {
      frontmatter?: Maybe<
        Pick<
          MarkdownRemarkFrontmatter,
          "title" | "date" | "description" | "slug" | "tags"
        >
      >
    }
  }[]
}

const BlogList: React.FC<BlogListItemProps> = ({ posts }) => (
  <Fragment>
    {posts.map(({ node }) => {
      const { frontmatter } = node
      const { slug, title, date, tags, description } = frontmatter
      return (
        <BlogItem key={slug}>
          <BlogTitle>
            <Link to={`/${slug}`}>{title}</Link>
          </BlogTitle>
          <ArticleDescription>{description}</ArticleDescription>
          <ArticleInfoWrapper>
            <TagsWrapper>
              <Tags tags={tags} />
            </TagsWrapper>
            <time
              className="index-time"
              dateTime={moment(date).format(`MM.DD.YYYY`)}
            >
              {moment(date).format(`MM.DD.YYYY`)}
            </time>
          </ArticleInfoWrapper>
        </BlogItem>
      )
    })}
  </Fragment>
)

const BlogItem = styled.article`
  border-bottom: 1px solid rgb(238, 235, 241);
  padding: 1rem;
`
const BlogTitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 17px;
  a {
    color: inherit;
    text-decoration: none;
  }
`

const ArticleDescription = styled.p`
  margin-bottom: 0;
  font-size: 11px;
  color: #9c9696;
`

const ArticleInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  time {
    font-size: 14px;
  }
`

export default BlogList
