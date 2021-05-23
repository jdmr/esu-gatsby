import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HomeDialogaTemplate = ({ data }) => {
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    let count = 0
    return (
        <Layout>
            <Seo
                title="Profundiza En Su Palabra"
                description="Profundiza en el estudio de su Palabra"
            />
            <div className="container mx-auto p-2">
                <div className="grid gap-4 md:grid-cols-2">
                    {edges.map((a) => {
                        if (count++ >= 10) {
                            return
                        }
                        return (
                            <div
                                key={a.node.frontmatter.link}
                                className="prose lg:prose-xl"
                            >
                                <Link
                                    to={a.node.frontmatter.link}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <h2>{a.node.frontmatter.title}</h2>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: a.node.html
                                        }}
                                    />
                                </Link>
                            </div>
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

HomeDialogaTemplate.propTypes = {
    data: PropTypes.object
}

export default HomeDialogaTemplate
