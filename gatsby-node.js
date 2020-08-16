const path = require("path")

exports.createPages = async gatsbyNodeHelpers => {
  const { graphql, actions } = gatsbyNodeHelpers
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // templates/post.tsx pagination
  const posts = result.data.allMarkdownRemark.edges
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

  // templates/index.tsx pagination
  const postsPerPage = 10
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
}
