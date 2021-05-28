import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const ComparteTemplate = ({
    data // this prop will be injected by the GraphQL query below.
}) => {
    const { markdownRemark, rel } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    let count = 0
    return (
        <Layout>
            <Seo
                title={frontmatter.title}
                description={frontmatter.description}
            />
            <div className="container mx-auto px-2 py-8 prose lg:prose-xl">
                <h1>{frontmatter.title}</h1>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                    {frontmatter.author && (
                        <div>
                            <Link
                                to={
                                    '/perfiles/' +
                                    frontmatter.author.replace(/ /g, '+')
                                }
                                style={{ textDecoration: 'none' }}
                            >
                                <span className="text-primary hover:text-primary-light">
                                    {frontmatter.author}
                                </span>
                            </Link>
                        </div>
                    )}
                    <div>{frontmatter.date}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
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
                            if (a.node.frontmatter.link === frontmatter.slug) {
                                return
                            }
                            if (count++ >= 10) {
                                return
                            }
                            return (
                                <div key={a.node.frontmatter.link}>
                                    <Link
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
                                            className="mt-2 text-xl tracking-wider text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed"
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
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!, $rel: String) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                date(formatString: "DD MMMM, YYYY", locale: "es")
                author
                title
                description
                slug
            }
        }
        rel: allMarkdownRemark(filter: { frontmatter: { rel: { eq: $rel } } }) {
            edges {
                node {
                    frontmatter {
                        link
                        author
                        tipo
                        date(formatString: "dddd DD MMMM, YYYY", locale: "es")
                        title
                        description
                    }
                    html
                }
            }
        }
    }
`

ComparteTemplate.propTypes = {
    data: PropTypes.object
}

export default ComparteTemplate
