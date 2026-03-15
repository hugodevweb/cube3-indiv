import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#09B1BA',
          dark: '#07959d',
          light: '#e6f8f9',
        },
        surface: '#ffffff',
        border: {
          DEFAULT: '#e8e8e8',
          hover: '#c8c8c8',
        },
        text: {
          DEFAULT: '#1A1A1A',
          secondary: '#4a4a4a',
          muted: '#888888',
        },
        success: '#18a058',
        error: '#e03e3e',
        background: '#f7f7f7',
      },
      boxShadow: {
        sm: '0 1px 4px rgba(0,0,0,0.07)',
        md: '0 4px 20px rgba(0,0,0,0.10)',
        lg: '0 12px 40px rgba(0,0,0,0.14)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        pill: '999px',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
