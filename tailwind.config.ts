import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/images/banner.jpg')",
      },
      colors: {
        green400: "#73c358",
        green500: "#3f882b",
        green600: "#2b5222",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
