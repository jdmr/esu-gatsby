const leccionesQuery = `{
    lecciones: allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "leccion"}}}) {
        edges {
            node {
                id
                frontmatter {
                    slug
                    title
                    description
                    tipo
                }
                excerpt(pruneLength: 5000)
            }
        }
    }
}`

const dialogaQuery = `{
    dialoga: allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "dialoga"}}}) {
        edges {
            node {
                id
                frontmatter {
                    slug
                    title
                    description
                    tipo
                    author
                }
                excerpt(pruneLength: 5000)
            }
        }
    }
}`

const comunicaQuery = `{
    comunica: allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "comunica"}}}) {
        edges {
            node {
                id
                frontmatter {
                    slug
                    title
                    description
                    tipo
                    author
                }
                excerpt(pruneLength: 5000)
            }
        }
    }
}`

const perfilesQuery = `{
    perfiles: allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "perfil"}}}) {
        edges {
            node {
                id
                frontmatter {
                    slug
                    title
                    tipo
                }
            }
        }
    }
}`

function articuloToAlgoliaRecord({ node: { id, frontmatter, ...rest } }) {
    return {
        objectID: id,
        ...frontmatter,
        ...rest
    }
}

const queries = [
    {
        query: leccionesQuery,
        transformer: ({ data }) =>
            data.lecciones.edges.map(articuloToAlgoliaRecord),
        indexName: 'esu',
        settings: { attributesToSnippet: [`excerpt:20`] }
    },
    {
        query: dialogaQuery,
        transformer: ({ data }) =>
            data.dialoga.edges.map(articuloToAlgoliaRecord),
        indexName: 'esu_dialoga',
        settings: { attributesToSnippet: [`excerpt:20`] }
    },
    {
        query: comunicaQuery,
        transformer: ({ data }) =>
            data.comunica.edges.map(articuloToAlgoliaRecord),
        indexName: 'esu_comunica',
        settings: { attributesToSnippet: [`excerpt:20`] }
    },
    {
        query: perfilesQuery,
        transformer: ({ data }) =>
            data.perfiles.edges.map(articuloToAlgoliaRecord),
        indexName: 'esu_perfiles'
    }
]

module.exports = queries
