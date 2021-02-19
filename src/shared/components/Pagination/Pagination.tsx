import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"

interface Props {
  currentPage: number
  numPages: number
}

export const Pagination: React.FC<Props> = ({ currentPage, numPages }) => {
  const pageNumberLists = Array.from({ length: numPages }, (_, i) => (
    <PaginationItem key={`pagination-number${i + 1}`}>
      <PaginationLink
        key={`pagination-number${i + 1}`}
        to={`/${i === 0 ? "" : i + 1}`}
        $isCurrentPage={i + 1 === currentPage}
      >
        {i + 1}
      </PaginationLink>
    </PaginationItem>
  ))

  return <PaginationLists>{numPages > 1 && pageNumberLists}</PaginationLists>
}

const PaginationLists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
`
const PaginationItem = styled.li`
  margin: 0;
`
const PaginationLink = styled(Link)<{ $isCurrentPage: boolean }>`
  padding: 10px;
  text-decoration: none;
  border-radius: 10px;
  color: ${props => (props.$isCurrentPage ? "white" : "inherit")};
  background: ${props => props.$isCurrentPage && "#feb530"};
`
