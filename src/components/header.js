import React, { useState } from 'react'
import { Link } from 'gatsby'

const Header = () => {
    const [isOpen, setOpen] = useState(false)

    return (
        <header id="header" className="text-gray-200 bg-primary">
            <nav className="container mx-auto md:flex md:justify-between md:items-center px-4">
                <div className="py-6 flex justify-between items-center">
                    <div className="text-3xl tracking-widest">
                        <Link
                            to="/"
                            className="transition-colors duration-300 ease-in-out hover:text-accent"
                        >
                            ESU
                        </Link>
                    </div>
                    <button
                        id="menu-btn"
                        className="text-white flex items-center p-2 md:hidden transition-colors duration-300 ease-in-out hover:text-accent focus:outline-none focus:shadow-outline"
                        onClick={(e) => toggleMenu(e, 400, setOpen)}
                    >
                        {isOpen ? (
                            <svg
                                aria-labelledby="closeTitle"
                                role="img"
                                className="h-8 w-8 p-2 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title id="closeTitle">Close Menu</title>
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                            </svg>
                        ) : (
                            <svg
                                aria-labelledby="menuTitle"
                                role="img"
                                className="h-8 w-8 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title id="menuTitle">Open Menu</title>
                                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div
                    id="menu-div"
                    className="hidden md:flex flex-col text-2xl tracking-widest md:flex-row"
                >
                    <Link
                        className="p-4 transition-colors duration-300 ease-in-out hover:text-accent focus:outline-none focus:text-accent md:min-w-max"
                        to="/estudia"
                    >
                        Estudia
                    </Link>
                    <Link
                        className="p-4 transition-colors duration-300 ease-in-out hover:text-accent focus:outline-none focus:text-accent md:min-w-max"
                        to="/profundiza"
                    >
                        Profundiza
                    </Link>
                    <Link
                        className="p-4 transition-colors duration-300 ease-in-out hover:text-accent focus:outline-none focus:text-accent md:min-w-max"
                        to="/comparte"
                    >
                        Comparte
                    </Link>
                </div>
            </nav>
        </header>
    )
}

const slideUp = (target, duration = 400, setOpen) => {
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.boxSizing = 'border-box'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
        target.classList.add('hidden')
        target.classList.remove('flex')

        target.style.removeProperty('height')
        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
        //alert("!");
        setOpen(false)
    }, duration)
}

const slideDown = (target, duration = 400, setOpen) => {
    target.style.removeProperty('display')
    target.classList.add('flex')
    target.classList.remove('hidden')
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
        target.style.removeProperty('height')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
        setOpen(true)
    }, duration)
}

const toggleMenu = (e, duration = 1000, setOpen) => {
    e.preventDefault()
    const target = document.getElementById('menu-div')
    if (window.getComputedStyle(target, duration).display === 'none') {
        return slideDown(target, duration, setOpen)
    }
    return slideUp(target, duration, setOpen)
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
