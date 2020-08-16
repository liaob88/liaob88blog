import { Link } from "gatsby"
import React from "react"
import {
  SitePageContextNext,
  SitePageContextPrevious,
} from "../../../gatsby-graphql"
import "./pagination.css"

interface IndexPageProps {
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

export const IndexPagePagination: React.FC<IndexPageProps> = ({
  isFirst,
  isLast,
  prevPage,
  nextPage,
  currentPage,
  numPages,
}) => {
  const pageNumbers = Array.from({ length: numPages }, (_, i) => (
    <li key={`pagination-number${i + 1}`} className="page-item">
      <Link
        key={`pagination-number${i + 1}`}
        to={`/${i === 0 ? "" : i + 1}`}
        className={`page-link ${i + 1 === currentPage ? "on-current" : ""}`}
      >
        {i + 1}
      </Link>
    </li>
  ))

  return (
    <ul className="page-lists">
      {!isFirst && (
        <Link className="page-link" to={prevPage} rel="prev">
          ←
        </Link>
      )}
      {pageNumbers}
      {!isLast && (
        <Link className="page-link" to={nextPage} rel="next">
          →
        </Link>
      )}
    </ul>
  )
}

export const BlogPagePagination: React.FC<BlogPageProps> = ({
  previous,
  next,
}) => (
  <ul>
    <li>
      {previous && (
        <Link to={previous.frontmatter.slug}>
          ← {previous.frontmatter.title}
        </Link>
      )}
    </li>
    <li>
      {next && (
        <Link to={next.frontmatter.slug}>{next.frontmatter.title} →</Link>
      )}
    </li>
  </ul>
)
