module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    light: 'var(--primary-light)',
                    dark: 'var(--primary-dark)'
                },
                dark: {
                    DEFAULT: 'var(--dark)',
                    light: 'var(--dark-light)'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require(`@tailwindcss/typography`),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio')
    ]
}
