module.exports = {
    purge: {
        enabled: false,
        content: ['./public/**/*.html', './src/**/*.tsx'],
    },
    theme: {
        extend: {
            fontSize: {
                '2xs': '0.5rem',
                '3xs': '0.25rem',
            },
            fontFamily: {
                Montserrat: ['Montserrat', 'sans-serif']
            },
            keyframes: {
                pawPrint: {
                    '0%, 19%, 100%': { opacity: 0 },
                    '20%, 60%': { opacity: 1 },
                },
                slide: {
                    '0%': { maxHeight: 0, overflow: 'hidden', opacity: 0.5 },
                    '100%': { maxHeight: '70vh', overflow: 'hidden', opacity: 1 },
                }
            },
            animation: {
                showPawPrint: 'pawPrint 4s infinite',
                slideDown: 'slide 0.5s linear',
            },
        }
    },
    variants: {
        display: ['responsive', 'group-hover'],
        scale: ['responsive', 'group-hover'],
        animation: ['hover', 'group-hover'],
        borderStyle: ['hover'],
    }
};