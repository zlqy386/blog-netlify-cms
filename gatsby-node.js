const path = require('path')
const { get, uniq, kebabCase } = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = get(result, "data.allMarkdownRemark.edges")
  // Create the blog index pages like `/blog`, `/blog/2`, `/blog/3`, etc.
  // each page will have 10 items
  // blog posts and a link to the next and previous pages.
  console.log(posts)
  paginate({
    createPage,
    items: posts,
    component: path.resolve('src/pages/posts/index.js'),
    // component: path.resolve('src/templates/blog-index.js'),
    itemsPerPage: 10,
    pathPrefix: "/posts"
  });

  posts.forEach((edge) => {
    const id = edge.node.id
    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })

  // Tag pages:
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach((edge) => {
    if (get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  // Eliminate duplicate tags
  tags = uniq(tags)

  // Make tag pages
  tags.forEach((tag) => {
    const tagPath = `/tags/${kebabCase(tag)}/`

    // paginate({
    //   createPage,
    //   path: tagPath,
    //   component: path.resolve(`src/templates/tags.js`),
    //   context: {
    //     tag,
    //   },
    // })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
