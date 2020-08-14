import React from "react"
import { Link } from "gatsby"
import "./tags.css"

const Tags = ({ tags }) => {
  return tags.map((tag: string, i: number) => (
    <Link className="tag-name" key={i} to={`/tags/${tag}`}>
      {tag}
    </Link>
  ))
}

export default Tags
