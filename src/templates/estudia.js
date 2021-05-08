import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const EstudiaTemplate = ({ data }) => {
    const { leccion, versiculo } = data
    const { frontmatter, html } = leccion
    return (
        <Layout>
            <Seo
                title={frontmatter.title}
                description={frontmatter.description}
            />
            <div className="bg-dark">
                <div
                    className="container mx-auto py-8 px-2 prose lg:prose-xl text-gray-100 text-xl tracking-wider leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: versiculo.html }}
                />
            </div>
            <div className="container mx-auto px-2 py-8 prose lg:prose-xl">
                <h1 className="text-center">{frontmatter.title}</h1>
                <div
                    className="grid gap-2 items-center"
                    style={{ gridTemplateColumns: 'auto 1fr auto' }}
                >
                    {frontmatter.anterior && (
                        <Link
                            to={frontmatter.anterior}
                            className="hover:text-blue-400 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                            </svg>
                        </Link>
                    )}
                    {!frontmatter.anterior && <div></div>}
                    <div className="text-center">{frontmatter.date}</div>
                    {frontmatter.siguiente && (
                        <Link
                            to={frontmatter.siguiente}
                            className="hover:text-blue-400 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                            </svg>
                        </Link>
                    )}
                    {!frontmatter.siguiente && <div></div>}
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!, $versiculo: String!) {
        leccion: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                date(formatString: "dddd DD MMMM, YYYY", locale: "es")
                title
                description
                versiculo
                anterior
                siguiente
            }
        }
        versiculo: markdownRemark(frontmatter: { slug: { eq: $versiculo } }) {
            html
        }
    }
`

EstudiaTemplate.propTypes = {
    data: PropTypes.object
}

export default EstudiaTemplate
