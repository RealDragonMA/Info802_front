module.exports = {
    mode: 'jit',
    content: [
        './index.html',
        './src/**/*.{svelte,js,ts}',
    ],
    theme: {
        fontFamily: {
            'montserrat': ['Poppins', 'sans-serif'],
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                statusquiz: {
                    // primary yale blue
                    'primary': '#0D3B66',
                    // secondary
                    'secondary': '#FAF0CA',
                    // accent
                    'accent': '#EE964B',
                    // neutral
                    'neutral': '#F4D35E',
                    // success
                    'error': '#F95738',
                    'success': '#4c9414',
                }
            }
        ]
    }
};