import * as React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
    <footer className="text-gray-200 bg-primary">
        <div className="container mx-auto px-2 py-8 flex flex-col gap-4 justify-center text-center">
            <div className="text-2xl tracking-wider">
                "Profundiza en la palabra... Cambia tu mundo"
            </div>
            <div>
                <Link
                    to="/"
                    className="text-4xl tracking-wider hover:underline focus:underline"
                >
                    Escuela Sabática Universitaria
                </Link>
            </div>
            <div className="tracking-wider">
                © {new Date().getFullYear()}{' '}
                <a
                    href="https://um.edu.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:underline"
                >
                    Universidad de Montemorelos
                </a>
            </div>
        </div>
    </footer>
)

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
