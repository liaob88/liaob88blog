// syntax highlight
import React from "react"
import styled from "styled-components"
import { TagsWrapper } from "../Styles"
import Tags from "./Tags"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  html: Queries.MarkdownRemark["html"]
  title: Queries.MarkdownRemarkFrontmatter["title"]
  tags: Queries.MarkdownRemarkFrontmatter["tags"]
  createdAt: string
  latestModifiedAt: string | null
}

const ArticleContent: React.FC<Props> = ({
  html,
  title,
  tags,
  createdAt,
  latestModifiedAt,
}) => {
  return (
    <PostPageWrapper>
      <DateArea>
        <DateParagraph>
          <FontAwesomeIcon icon={"pencil-alt"} />
          <time>{createdAt}</time>
        </DateParagraph>
        {latestModifiedAt && latestModifiedAt > createdAt && (
          <DateParagraph>
            <FontAwesomeIcon icon={"redo-alt"} />
            <time>{latestModifiedAt}</time>
          </DateParagraph>
        )}
      </DateArea>
      <h1>{title}</h1>
      <TagsWrapper $bottomSpace={true}>
        <Tags tags={tags} />
      </TagsWrapper>
      <MarkdownContent dangerouslySetInnerHTML={{ __html: html ?? "" }} />
    </PostPageWrapper>
  )
}

const PostPageWrapper = styled.div`
  font-size: 0.85rem !important;
  padding: 0 1rem;
  margin-bottom: 5rem;
`

const DateArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.7rem;
  time {
    margin-left: 5px;
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

const DateParagraph = styled.p`
  margin: 0 10px 0;
`

export default ArticleContent
