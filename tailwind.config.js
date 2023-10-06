module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["dracula"],
    },
    safelist: ["tooltip-success", "tooltip-error"],
};
