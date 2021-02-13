import { GatsbyNode } from "gatsby";
import * as path from "path";
import { MarkdownRemarkFrontmatter } from './../gatsby-graphql';

const query = `
  {
    postsRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            tags
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

interface PostPageResult {
  postsRemark: {
    edges: {
      node: {
        frontmatter: MarkdownRemarkFrontmatter
      }
    }[]
  }
  tagsGroup: {
    group: {
      fieldValue: string[]
      totalCount: number
    }[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<PostPageResult>(query)
  if (result.errors) {
    throw result.errors
  }

  // templates/post.tsx
  const posts = result.data.postsRemark.edges
  const blogPost = path.resolve(`./src/templates/post.tsx`)
  posts.forEach(({ node }, index) => {
    const next = getNextPost(index)
    const previous = getPreviousPost(index)
    createPage({
      path: node.frontmatter.slug,
      component: blogPost,
      context: {
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
        previous,
        next,
      },
    })
  })
  // pagination configuration
  const postsPerPage = 10

  // templates/index.tsx
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/" : `/${i + 1}`,
      component: path.resolve("./src/templates/index.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // templates/tag-page.tsx
  const tags = result.data.tagsGroup.group
  tags.forEach(({ fieldValue, totalCount }) => {
    const numTagPages = Math.ceil(totalCount / postsPerPage)
    Array.from({ length: numTagPages }).forEach((_, i) => {
      const pageNumber = i === 0 ? "" : `/${i + 1}`
      createPage({
        path: `/tags/${fieldValue}/${pageNumber}`,
        component: path.resolve("./src/templates/TagPage.tsx"),
        context: {
          tag: fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalCount,
          numTagPages,
          currentPage: i + 1,
        },
      })
    })
  })

  function getNextPost(index: number) {
    if (index + 1 === posts.length) {
      return null
    }
    return posts[index + 1].node
  }

  function getPreviousPost(index: number) {
    if (index === 0) {
      return null
    }
    return posts[index - 1].node
  }
}
