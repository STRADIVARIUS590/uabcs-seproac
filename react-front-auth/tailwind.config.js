/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'left-top-radial': 'radial-gradient(at left top, #1B1059, #3F24B4)',
            },
            colors: {
                'vi': {
                    '50': '#f3f3ff',
                    '100': '#e9e9fe',
                    '200': '#d6d7fe',
                    '300': '#b7b6fc',
                    '400': '#938cf9',
                    '500': '#6f5ef4',
                    '600': '#5b3ceb',
                    '700': '#4c2ad7',
                    '800': '#3f23b4',
                    '900': '#351e94',
                    '950': '#1b0f59',
                },
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
