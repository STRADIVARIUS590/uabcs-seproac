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
                'snow': {
                    '50': '#ffffff',
                    '100': '#efefef',
                    '200': '#dcdcdc',
                    '300': '#bdbdbd',
                    '400': '#989898',
                    '500': '#7c7c7c',
                    '600': '#656565',
                    '700': '#525252',
                    '800': '#464646',
                    '900': '#3d3d3d',
                    '950': '#292929',
                },

                'sweden': {
                    '50': '#f9f7f7',
                    '100': '#f2eeee',
                    '200': '#e0d6d6',
                    '300': '#d7caca',
                    '400': '#beabab',
                    '500': '#a68d8d',
                    '600': '#8e7474',
                    '700': '#765f5f',
                    '800': '#635151',
                    '900': '#554747',
                    '950': '#2c2323',
                },

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
