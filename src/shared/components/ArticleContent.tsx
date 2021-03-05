// syntax highlight
import moment from "moment"
import React from "react"
import styled from "styled-components"
import {
  MarkdownRemark,
  MarkdownRemarkFrontmatter,
} from "../../../gatsby-graphql"
import { TagsWrapper } from "../Styles"
import Tags from "./Tags"

interface Props {
  html: MarkdownRemark["html"]
  post: Pick<MarkdownRemarkFrontmatter, "title" | "tags" | "date">
}

const ArticleContent: React.FC<Props> = ({ html, post }) => {
  return (
    <PostPageWrapper>
      <time>作成日: {moment(post.date).format(`MM.DD.YYYY`)}</time>
      <h1>{post.title}</h1>
      <TagsWrapper $bottomSpace={true}>
        <Tags tags={post.tags} />
      </TagsWrapper>
      <MarkdownContent dangerouslySetInnerHTML={{ __html: html }} />
    </PostPageWrapper>
  )
}

const PostPageWrapper = styled.div`
  p,
  li {
    font-size: 0.9em;
  }
  padding: 0 1rem;
  margin-bottom: 5rem;
  time {
    display: block;
    text-align: end;
    margin-bottom: 1rem;
  }
`

const MarkdownContent = styled.div`
  h2 {
    border-left: 5px solid #feb530;
    padding-left: 15px;
  }
  h3 {
    border-bottom: 5px double #feb530;
    display: inline-block;
  }
  a {
    color: inherit;
  }
`

export default ArticleContent
