/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
    try {
        const { createPage } = actions
        const result = await graphql(`
            query {
                allMarkdownRemark {
                    edges {
                        node {
                            frontmatter {
                                slug
                                tipo
                                versiculo
                            }
                        }
                    }
                }
            }
        `)

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            switch (node.frontmatter.tipo) {
                case 'leccion':
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(`./src/templates/estudia.js`),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                            versiculo: node.frontmatter.versiculo
                        }
                    })
                    break
                case 'dialoga':
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(
                            `./src/templates/profundiza.js`
                        ),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug
                        }
                    })
                    break
                case 'comunica':
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(`./src/templates/comparte.js`),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug
                        }
                    })
                    break
            }
        })
    } catch (err) {
        console.error('Could not create pages: ', err)
        throw err
    }
}
