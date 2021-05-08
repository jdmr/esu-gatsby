import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HomeTemplate = ({
    data // this prop will be injected by the GraphQL query below.
}) => {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
            <Seo
                title={frontmatter.title}
                description={frontmatter.description}
            />
            <div className="container mx-auto p-2 prose lg:prose-xl">
                <h1>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                date(formatString: "DD MMMM, YYYY", locale: "es")
                title
                description
            }
        }
    }
`

HomeTemplate.propTypes = {
    data: PropTypes.object
}

export default HomeTemplate
