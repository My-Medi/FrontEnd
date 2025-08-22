/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D68FF',
        'primary-dark': '#002F8E',
        'primary-light': '#DBE6FF',
        'primary-subtle': '#82ABFD',
        black: '#121218',
        'gray-0': '#FFFFFF',
        'gray-100': '#EDF0F3',
        'gray-200': '#C5C8CB',
        'gray-300': '#9DA0A3',
        'gray-400': '#75787B',
        'gray-500': '#4D5053',
        'gray-600': '#25282B',
        danger: '#ED5151',
        warning: '#FF732D',
        caution: '#FFCC00',
        'safe-light': '#A1F68E',
        safe: '#247CFF',
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        h1: ['32px', { lineHeight: '1.125', fontWeight: '600' }],
        'h2-semibold': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
        'h2-medium': ['24px', { lineHeight: '1.5', fontWeight: '500' }],
        h3: ['22px', { lineHeight: '1.636', fontWeight: '400' }],
        'body-1-regular': ['20px', { lineHeight: '1.8', fontWeight: '400' }],
        'body-1-light': ['20px', { lineHeight: '1.8', fontWeight: '300' }],
        'body-2': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption-1': ['15px', { lineHeight: '1.5', fontWeight: '600' }],
        'caption-2': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif',
        ],
      },
      keyframes: {
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(2rem) scale(0.9)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'translateX(-0.5rem) scale(1.02)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        'bounce-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(2rem) scale(0.8)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateX(-0.3rem) scale(1.05)',
          },
          '80%': {
            transform: 'translateX(0.1rem) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.7s ease-out',
        'bounce-in': 'bounce-in 0.8s ease-out',
      },
    },
  },
  plugins: [],
};
