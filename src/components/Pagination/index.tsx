import { Link } from "gatsby"
import React from "react"
import {
  SitePageContextNext,
  SitePageContextPrevious,
} from "../../../gatsby-graphql"
import "./pagination.css"

interface PaginationProps {
  isFirst: boolean
  isLast: boolean
  prevPage: string
  nextPage: string
  currentPage: number
  numPages: number
}

interface BlogPageProps {
  previous: SitePageContextPrevious
  next: SitePageContextNext
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  numPages,
}) => {
  const pageNumberLists = Array.from({ length: numPages }, (_, i) => (
    <li key={`pagination-number${i + 1}`} className="page-item">
      <Link
        key={`pagination-number${i + 1}`}
        to={`/${i === 0 ? "" : i + 1}`}
        className={`page-link${i + 1 === currentPage ? " on-current" : ""}`}
      >
        {i + 1}
      </Link>
    </li>
  ))

  return <ul className="page-lists">{numPages > 1 && pageNumberLists}</ul>
}

export const PostPagePagination: React.FC<BlogPageProps> = ({
  previous,
  next,
}) => (
  <ul className="postPagePagination-lists">
    <li>
      {previous && (
        <Link to={"/" + previous.frontmatter.slug}>
          [前の記事] {previous.frontmatter.title}
        </Link>
      )}
    </li>
    <li>
      <Link to="/">TOP</Link>
    </li>
    <li>
      {next && (
        <Link to={"/" + next.frontmatter.slug}>
          [次の記事] {next.frontmatter.title}
        </Link>
      )}
    </li>
  </ul>
)
