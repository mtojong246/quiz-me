/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontSize: {
      xsm: ['12px', '18px'],
      sm: ['14px', '20px'],
      reg: ['16px', '24px'],
      med: ['18px', '26px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      xxl: ['32px', '40px']
    }
  },
  plugins: [],
}
