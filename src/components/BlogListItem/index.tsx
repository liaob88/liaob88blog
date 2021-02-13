import { Link } from "gatsby"
import moment from "moment"
import React from "react"
import { MarkdownRemarkFrontmatter, Maybe } from "../../../gatsby-graphql"
import Tags from "../Tags"
import "./blog-list-item.css"

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

const BlogListItem: React.FC<BlogListItemProps> = ({ posts }) => (
  <div className="blog-list-container">
    {posts.map(({ node }) => {
      const { frontmatter } = node
      const { slug, title, date, tags, description } = frontmatter
      return (
        <article key={slug}>
          <div className="article-contents">
            <h2 className="article-title">
              <Link to={`/${slug}`}>{title}</Link>
            </h2>
            <p className="article-description">{description}</p>
            <div className="article-info">
              <div className="tags-wrapper">
                <Tags tags={tags} />
              </div>
              <time
                className="index-time"
                dateTime={moment(date).format(`MM.DD.YYYY`)}
              >
                {moment(date).format(`MM.DD.YYYY`)}
              </time>
            </div>
          </div>
        </article>
      )
    })}
  </div>
)

export default BlogListItem
