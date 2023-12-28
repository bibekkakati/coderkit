module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["sunset"],
    },
    safelist: ["tooltip-success", "tooltip-error"],
    theme: {
        extend: {
            colors: {
                "ck-primary": "#5eb299",
                "ck-secondary": "#fcb415",
            },
        },
    },
};
