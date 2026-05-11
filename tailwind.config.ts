import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'grey': {
          background: '#F5F5F5',
          'border': '#E0E0E0',
          'border-darker': '#CCCCCC',
          'text-main': '#666666',
        },
        'primary': {
          '600': '#2563EB',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        'body-s': ['14px', { lineHeight: '20px' }],
        'body-m': ['16px', { lineHeight: '24px' }],
        'body-xl': ['20px', { lineHeight: '28px' }],
        'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-2': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'heading-m': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'heading-l': ['48px', { lineHeight: '56px', fontWeight: '600' }],
        'heading-s': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'uppercase': ['12px', { lineHeight: '16px', fontWeight: '600', textTransform: 'uppercase' }],
      },
    },
  },
  plugins: [],
}

export default config
