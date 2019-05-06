/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // createNodeField({
    //   node,
    //   name: `slug2`,
    //   value: slug,
    // })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result.errors)
      return reject(result.errors)
    }

    // すべてのPosts情報
    const posts = result.data.allMarkdownRemark.edges

    // 重複のないすべてのTagの抽出
    const allTags = posts
      .map(({ node }) => {
        return node.frontmatter.tags
      })
      .reduce(
        (accArray, currentArray) => (accArray = accArray.concat(currentArray)),
        []
      )
      .filter((tag, index, self) => {
        return self.indexOf(tag) === index
      })
    // console.log(allTags)

    // Tag pageの動的生成
    allTags.forEach((tag, index) => {
      createPage({
        path: `/tags/${tag.replace(" ", "-").toLowerCase()}/`,
        component: path.resolve(`./src/templates/blog-tag.js`),
        context: {
          tag: tag,
        },
      })
    })

    // Markdown -> HTML pageの動的生成
    posts.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          // 新しい順なので、indexが若いほうが新しいブログ記事になる
          next: index === 0 ? null : posts[index - 1],
          prev: index === result.length - 1 ? null : posts[index + 1],
        },
      })
    })
  })
}
