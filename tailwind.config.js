/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#ff6a00",
                    dark: "#cc5500",
                    light: "#ff8a33",
                },

                accent: "#ffd8b5",

                background: "#fff7f0",
                "background-dark": "#1b1b1b",

                foreground: "#2a2a2a",

                muted: "#7a7a7a",

                card: "#ffffff",

                "border-soft": "#ffe2cc",
            },

            boxShadow: {
                food: "0 8px 20px rgba(0,0,0,0.08)",
                soft: "0 4px 12px rgba(0,0,0,0.06)",
            },

            borderRadius: {
                food: "14px",
            },

            transitionTimingFunction: {
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },

    plugins: [],
}