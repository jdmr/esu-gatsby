import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HomeComunicaTemplate = ({ data }) => {
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    let count = 0
    return (
        <Layout>
            <Seo
                title="Comparte Su Palabra"
                description="Comparte el estudio de su Palabra"
            />
            <div className="container mx-auto py-8 px-2">
                <div className="grid gap-12 md:grid-cols-2">
                    {edges.map((a) => {
                        if (count++ >= 10) {
                            return
                        }
                        return (
                            <Link
                                key={a.node.frontmatter.link}
                                to={a.node.frontmatter.link}
                                style={{ textDecoration: 'none' }}
                                className="group"
                            >
                                <h2 className="text-3xl font-bold tracking-wider text-gray-700 group-hover:text-primary transition-colors">
                                    {a.node.frontmatter.title}
                                </h2>
                                {a.node.frontmatter.link &&
                                    !a.node.frontmatter.link.includes(
                                        'estudia'
                                    ) && (
                                        <h3 className="mt-1 text-xl font-bold tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
                                            {a.node.frontmatter.author}
                                        </h3>
                                    )}
                                <div
                                    className="mt-2 text-xl tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: a.node.html
                                    }}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        allMarkdownRemark(filter: { frontmatter: { rel: { eq: $slug } } }) {
            edges {
                node {
                    frontmatter {
                        link
                        author
                        tipo
                        date
                        title
                        description
                    }
                    html
                }
            }
        }
    }
`

HomeComunicaTemplate.propTypes = {
    data: PropTypes.object
}

export default HomeComunicaTemplate
