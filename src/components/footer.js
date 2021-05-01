import * as React from 'react'

const Footer = () => (
    <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
)

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
