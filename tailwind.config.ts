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
        cream: '#F5F5DC', // warm background
        navy: '#1A3C5E', // dark blue for headings and text
        gold: '#C9A84C', // accent color
        warm: {
          50: '#FFF8F0',
          100: '#FFF0DB',
          200: '#FFE5B4',
          300: '#FFD700', // can keep
          400: '#FFC125',
          500: '#FF9F0A',
          600: '#E67E22',
          700: '#D35400',
        },
      },
    },
  },
  plugins: [],
};
export default config;
