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
            var rel
            switch (node.frontmatter.tipo) {
                case 'leccion':
                    var slug = node.frontmatter.slug.replace(
                        '/estudia',
                        '/inicio'
                    )
                    var video = node.frontmatter.versiculo.replace(
                        '/versiculo',
                        '/video'
                    )
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(`./src/templates/estudia.js`),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                            versiculo: node.frontmatter.versiculo,
                            rel: slug
                        }
                    })
                    createPage({
                        path: slug,
                        component: path.resolve(
                            `./src/templates/homeInicio.js`
                        ),
                        context: {
                            slug: slug,
                            video: video,
                            versiculo: node.frontmatter.versiculo,
                            leccion: node.frontmatter.slug
                        }
                    })
                    if (node.frontmatter.slug.endsWith('/sabado')) {
                        slug = slug.replace('/inicio', '/profundiza')
                        slug = slug.replace('/sabado', '')
                        createPage({
                            path: slug,
                            component: path.resolve(
                                `./src/templates/homeDialoga.js`
                            ),
                            context: {
                                slug: slug
                            }
                        })
                        slug = slug.replace('/profundiza', '/comparte')
                        createPage({
                            path: slug,
                            component: path.resolve(
                                `./src/templates/homeComunica.js`
                            ),
                            context: {
                                slug: slug
                            }
                        })
                    }
                    break
                case 'dialoga':
                    rel = node.frontmatter.slug.substring(
                        0,
                        node.frontmatter.slug.lastIndexOf('/')
                    )
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(
                            `./src/templates/profundiza.js`
                        ),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                            rel: rel
                        }
                    })
                    break
                case 'comunica':
                    rel = node.frontmatter.slug.substring(
                        0,
                        node.frontmatter.slug.lastIndexOf('/')
                    )
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(`./src/templates/comparte.js`),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                            rel: rel
                        }
                    })
                    break
                case 'perfil':
                    rel = node.frontmatter.slug + '/rel'
                    createPage({
                        path: node.frontmatter.slug,
                        component: path.resolve(`./src/templates/perfil.js`),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                            rel: rel
                        }
                    })
                    break
                default:
            }
        })
    } catch (err) {
        console.error('Could not create pages: ', err)
        throw err
    }
}
