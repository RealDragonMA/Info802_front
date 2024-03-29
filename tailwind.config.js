module.exports = {
    mode: 'jit',
    content: [
        './index.html',
        './src/**/*.{svelte,js,ts}',
    ],
    theme: {
        fontFamily: {
            'montserrat': ['Poppins', 'sans-serif'],
        },
        extend: {
            width: {
                '1/24': '4.166666666666666%',
                '2/24': '8.333333333333332%',
                '3/24': '12.5%',
                '4/24': '16.666666666666664%',
                '5/24': '20.833333333333336%',
                '6/24': '25.0%',
                '7/24': '29.166666666666668%',
                '8/24': '33.33333333333333%',
                '9/24': '37.5%',
                '10/24': '41.66666666666667%',
                '11/24': '45.83333333333333%',
                '12/24': '50.0%',
                '13/24': '54.166666666666664%',
                '14/24': '58.333333333333336%',
                '15/24': '62.5%',
                '16/24': '66.66666666666666%',
                '17/24': '70.83333333333334%',
                '18/24': '75.0%',
                '19/24': '79.16666666666666%',
                '20/24': '83.33333333333334%',
                '21/24': '87.5%',
                '22/24': '91.66666666666666%',
                '23/24': '95.83333333333334%',
                '24/24': '100.0%',
                "1/48": "2.083333333333333%",
                "2/48": "4.166666666666666%",
                "3/48": "6.25%",
                "4/48": "8.333333333333332%",
                "5/48": "10.416666666666668%",
                "6/48": "12.5%",
                "7/48": "14.583333333333334%",
                "8/48": "16.666666666666664%",
                "9/48": "18.75%",
                "10/48": "20.833333333333336%",
                "11/48": "22.916666666666664%",
                "12/48": "25.0%",
                "13/48": "27.083333333333332%",
                "14/48": "29.166666666666668%",
                "15/48": "31.25%",
                "16/48": "33.33333333333333%",
                "17/48": "35.41666666666667%",
                "18/48": "37.5%",
                "19/48": "39.58333333333333%",
                "20/48": "41.66666666666667%",
                "21/48": "43.75%",
                "22/48": "45.83333333333333%",
                "23/48": "47.91666666666667%",
                "24/48": "50.0%",
                "25/48": "52.083333333333336%",
                "26/48": "54.166666666666664%",
                "27/48": "56.25%",
                "28/48": "58.333333333333336%",
                "29/48": "60.416666666666664%",
                "30/48": "62.5%",
                "31/48": "64.58333333333334%",
                "32/48": "66.66666666666666%",
                "33/48": "68.75%",
                "34/48": "70.83333333333334%",
                "35/48": "72.91666666666666%",
                "36/48": "75.0%",
                "37/48": "77.08333333333334%",
                "38/48": "79.16666666666666%",
                "39/48": "81.25%",
                "40/48": "83.33333333333334%",
                "41/48": "85.41666666666666%",
                "42/48": "87.5%",
                "43/48": "89.58333333333334%",
                "44/48": "91.66666666666666%",
                "45/48": "93.75%",
                "46/48": "95.83333333333334%",
                "47/48": "97.91666666666666%",
                "48/48": "100.0%"
            }
        }
    },
    variants: {
        extend: {
            width: {
                '1/24': '4.166666666666666%',
                '2/24': '8.333333333333332%',
                '3/24': '12.5%',
                '4/24': '16.666666666666664%',
                '5/24': '20.833333333333336%',
                '6/24': '25.0%',
                '7/24': '29.166666666666668%',
                '8/24': '33.33333333333333%',
                '9/24': '37.5%',
                '10/24': '41.66666666666667%',
                '11/24': '45.83333333333333%',
                '12/24': '50.0%',
                '13/24': '54.166666666666664%',
                '14/24': '58.333333333333336%',
                '15/24': '62.5%',
                '16/24': '66.66666666666666%',
                '17/24': '70.83333333333334%',
                '18/24': '75.0%',
                '19/24': '79.16666666666666%',
                '20/24': '83.33333333333334%',
                '21/24': '87.5%',
                '22/24': '91.66666666666666%',
                '23/24': '95.83333333333334%',
                '24/24': '100.0%',
                "1/48": "2.083333333333333%",
                "2/48": "4.166666666666666%",
                "3/48": "6.25%",
                "4/48": "8.333333333333332%",
                "5/48": "10.416666666666668%",
                "6/48": "12.5%",
                "7/48": "14.583333333333334%",
                "8/48": "16.666666666666664%",
                "9/48": "18.75%",
                "10/48": "20.833333333333336%",
                "11/48": "22.916666666666664%",
                "12/48": "25.0%",
                "13/48": "27.083333333333332%",
                "14/48": "29.166666666666668%",
                "15/48": "31.25%",
                "16/48": "33.33333333333333%",
                "17/48": "35.41666666666667%",
                "18/48": "37.5%",
                "19/48": "39.58333333333333%",
                "20/48": "41.66666666666667%",
                "21/48": "43.75%",
                "22/48": "45.83333333333333%",
                "23/48": "47.91666666666667%",
                "24/48": "50.0%",
                "25/48": "52.083333333333336%",
                "26/48": "54.166666666666664%",
                "27/48": "56.25%",
                "28/48": "58.333333333333336%",
                "29/48": "60.416666666666664%",
                "30/48": "62.5%",
                "31/48": "64.58333333333334%",
                "32/48": "66.66666666666666%",
                "33/48": "68.75%",
                "34/48": "70.83333333333334%",
                "35/48": "72.91666666666666%",
                "36/48": "75.0%",
                "37/48": "77.08333333333334%",
                "38/48": "79.16666666666666%",
                "39/48": "81.25%",
                "40/48": "83.33333333333334%",
                "41/48": "85.41666666666666%",
                "42/48": "87.5%",
                "43/48": "89.58333333333334%",
                "44/48": "91.66666666666666%",
                "45/48": "93.75%",
                "46/48": "95.83333333333334%",
                "47/48": "97.91666666666666%",
                "48/48": "100.0%"
            }
        }
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