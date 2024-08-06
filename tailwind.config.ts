import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fancy-yellow': '#febd1a',
      },
      fontFamily: {
        'mona-sans': ['Mona Sans', 'sans-serif'],
      },
      keyframes: {
        pluse: {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(23,23,23, 0.7)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 2px 7px rgba(23,23,23, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(23,23,23, 0)',
          },
        },
      },
      animation: {
        pluse: 'pluse 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
