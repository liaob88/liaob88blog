const path = require("path")

exports.createPages = async gatsbyNodeHelpers => {
  const { graphql, actions } = gatsbyNodeHelpers
  const { createPage } = actions

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark {
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
  `)

  if (result.errors) {
    throw result.errors
  }

  // templates/post.tsx
  const posts = result.data.postsRemark.edges
  const blogPost = path.resolve(`./src/templates/post.tsx`)
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

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
}
