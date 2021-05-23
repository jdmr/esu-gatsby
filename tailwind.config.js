module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    light: 'var(--primary-light)'
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
