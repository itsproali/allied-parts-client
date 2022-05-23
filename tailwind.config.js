module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bannerBg: "url(/src/img/engine-black.jpg)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a855f7",
          // primary: "#82e397",
          secondary: "#ec4899",
          // secondary: "#8da5d8",
          accent: "#0a3d62",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
};
