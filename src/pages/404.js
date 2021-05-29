import * as React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = ({ data }) => {
    const { rel } = data
    return (
        <Layout>
            <Seo title="404: Página no existe" />

            <div className="container mx-auto px-2 py-8 prose lg:prose-xl">
                <h1>404: Página no existe</h1>
                <p>
                    Esta página no existe... Pero aquí tenemos otras que te
                    pueden interesar.
                </p>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto px-2 py-8">
                    <div className="border-b border-gray-600 my-8">
                        <h2 className="text-4xl font-bold tracking-wider">
                            Más de ESU
                        </h2>
                    </div>
                    <div className="grid gap-12 md:grid-cols-2">
                        {rel.edges.map((a) => {
                            return (
                                <div key={a.node.frontmatter.slug}>
                                    <Link
                                        to={a.node.frontmatter.slug}
                                        style={{ textDecoration: 'none' }}
                                        className="group"
                                    >
                                        <h2 className="text-3xl font-bold tracking-wider text-gray-700 group-hover:text-primary transition-colors">
                                            {a.node.frontmatter.title}
                                        </h2>
                                        {a.node.frontmatter.slug &&
                                            !a.node.frontmatter.slug.includes(
                                                'estudia'
                                            ) && (
                                                <h3 className="mt-1 text-xl font-bold tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
                                                    {a.node.frontmatter.author}
                                                </h3>
                                            )}
                                        <div
                                            className="mt-2 text-xl tracking-wider text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    a.node.frontmatter
                                                        .description
                                            }}
                                        />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query {
        rel: allMarkdownRemark(
            filter: { frontmatter: { tipo: { eq: "dialoga" } } }
            limit: 10
        ) {
            edges {
                node {
                    frontmatter {
                        slug
                        author
                        tipo
                        date(formatString: "dddd DD MMMM, YYYY", locale: "es")
                        title
                        description
                    }
                }
            }
        }
    }
`

NotFoundPage.propTypes = {
    data: PropTypes.object
}

export default NotFoundPage
