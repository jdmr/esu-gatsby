import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HomeInicioTemplate = ({ data }) => {
    console.log(data)
    const { allMarkdownRemark, video, versiculo, leccion } = data
    const { edges } = allMarkdownRemark
    console.log(video)
    let count = 0
    let videoURL = video?.rawMarkdownBody.replaceAll(`\n`, '')
    videoURL = videoURL?.replaceAll(`\\`, '')
    return (
        <Layout>
            <Seo
                title={'Inicio: ' + leccion?.frontmatter.title}
                description={leccion?.frontmatter.description}
            />
            <div className="container mx-auto p-2 grid gap-4">
                {video?.rawMarkdownBody && (
                    <div className="embed-responsive">
                        <iframe
                            title={leccion?.frontmatter.title}
                            src={videoURL}
                            frameBorder="0"
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true"
                            allowFullScreen
                            className="shadow-xl rounded-xl"
                        ></iframe>
                    </div>
                )}
                {leccion?.frontmatter.title && (
                    <Link to={leccion?.frontmatter.slug} className="py-4 group">
                        <h1 className="text-4xl font-bold tracking-wider text-gray-700 group-hover:text-primary transition-colors">
                            {leccion?.frontmatter.title}
                        </h1>
                        <p className="mt-1 text-xl font-bold tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
                            {leccion?.frontmatter.date}
                        </p>
                        <div
                            className="mt-2 text-xl tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: leccion?.frontmatter.description
                            }}
                        ></div>
                    </Link>
                )}
                {versiculo?.html && (
                    <div className="bg-dark-light text-white py-8 mb-8 rounded-lg shadow-lg">
                        <div className="container mx-auto px-4 max-w-prose">
                            <div
                                className="text-2xl tracking-wider leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: versiculo?.html
                                }}
                            ></div>
                        </div>
                    </div>
                )}
                <div className="grid gap-12 md:grid-cols-2">
                    {edges.map((a) => {
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
                                        className="mt-2 text-xl tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed"
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
    query(
        $slug: String!
        $video: String
        $versiculo: String
        $leccion: String
    ) {
        allMarkdownRemark(filter: { frontmatter: { rel: { eq: $slug } } }) {
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
        video: markdownRemark(frontmatter: { slug: { eq: $video } }) {
            frontmatter {
                title
            }
            rawMarkdownBody
        }
        versiculo: markdownRemark(frontmatter: { slug: { eq: $versiculo } }) {
            html
        }
        leccion: markdownRemark(frontmatter: { slug: { eq: $leccion } }) {
            frontmatter {
                slug
                date(formatString: "dddd DD MMMM, YYYY", locale: "es")
                title
                description
            }
        }
    }
`

HomeInicioTemplate.propTypes = {
    data: PropTypes.object
}

export default HomeInicioTemplate
