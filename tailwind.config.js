/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F1F7F2',
          100: '#DFEFE1',
          200: '#C0DFC4',
          300: '#95C89C',
          400: '#64AC6E',
          500: '#41904C',
          600: '#30743A',
          700: '#275C2F',
          800: '#234928',
          900: '#1E3F20',
          950: '#0E2310'
        },
        pale: {
          50: '#FAFCFA',
          100: '#F2F8F3',
          200: '#E4F1E6',
          300: '#CEE5D2',
          400: '#B0D3B6',
          500: '#8FBDA9'
        },
        croco: {
          green: '#245229',
          light: '#EAF6EB',
          accent: '#38A169',
          dark: '#142717'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
