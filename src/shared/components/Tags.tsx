import React, { Fragment } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

type Props = {
  tags: string[]
}

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <Fragment>
      {tags.map((tag: string, i: number) => (
        <TagLink key={i} to={`/tags/${tag}`}>
          {tag}
        </TagLink>
      ))}
    </Fragment>
  )
}

const TagLink = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #feb530;
  border: 0.5px solid #feb530;
  font-weight: bold;
  text-decoration: none;
  font-size: 11px;
  padding: 0 8px;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  line-height: 1rem;
`

export default Tags
