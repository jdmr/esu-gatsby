module.exports = {
    flags: {
        FAST_DEV: true,
        DEV_SSR: false,
        PRESERVE_WEBPACK_CACHE: true,
        PRESERVE_FILE_DOWNLOAD_CACHE: true,
        PARALLEL_SOURCING: false,
        FUNCTIONS: false
    },
    siteMetadata: {
        title: `ESU`,
        description: `Sitio para el estudio de la Escuela Sabática`,
        author: `@jdmr`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/src/md`
            }
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Escuela Sabática Universitaria`,
                short_name: `ESU`,
                start_url: `/`,
                background_color: `#007f98`,
                theme_color: `#007f98`,
                display: `minimal-ui`,
                icon: `src/images/logo.png` // This path is relative to the root of the site.
            }
        }
        // `gatsby-plugin-gatsby-cloud`
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
}
