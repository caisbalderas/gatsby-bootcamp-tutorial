const path = require('path')

/* this was to create the slugs for the markdown posts
module.exports.onCreateNode = ({ node, actions}) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}
 */


module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js')

  // 2. Get markdown data
  /*const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)*/

  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  // 3.Create new pages for markdown
  /*
  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
  */
  res.data.allContentfulBlogPost.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}