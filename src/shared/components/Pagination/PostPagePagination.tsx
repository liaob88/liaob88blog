import { Link } from "@reach/router"
import React from "react"
import styled from "styled-components"

interface Props {
  previous: SitePageContextPrevious
  next: SitePageContextNext
}

export const PostPagePagination: React.FC<Props> = ({ previous, next }) => (
  <nav>
    <PaginationLists>
      <PaginationList>
        {previous && (
          <Link to={"/" + previous.frontmatter.slug}>
            [前の記事] {previous.frontmatter.title}
          </Link>
        )}
      </PaginationList>
      <PaginationList>
        <Link to="/">TOP</Link>
      </PaginationList>
      <PaginationList>
        {next && (
          <Link to={"/" + next.frontmatter.slug}>
            [次の記事] {next.frontmatter.title}
          </Link>
        )}
      </PaginationList>
    </PaginationLists>
  </nav>
)

const PaginationLists = styled.ul`
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  border-top: 1px dotted;
`

const PaginationList = styled.li`
  list-style: none;
  width: 30%;
  a {
    text-decoration: none;
  }
  :nth-child(2) {
    text-align: center;
  }
`
