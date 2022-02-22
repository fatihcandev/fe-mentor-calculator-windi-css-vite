import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        white: '#FFFFFF',
        bgPrimary: '#2B4173',
        bgSecondary: '#232c43',
        bgTertiary: '#182034',
        keyBgPrimary: '#eae3dc',
        keyBgSecondary: '#637097',
        keyBgTertiary: '#d03f2f',
        textPrimary: '#444b5a',
      },
      boxShadow: {
        primaryKey: '0 4px 0 #b4a597',
        secondaryKey: '0 4px 0 #404e72',
        tertiaryKey: '0 4px 0 #93261a',
      },
      fontFamily: {
        sans: ['Spartan', 'sans-serif'],
      },
    },
  },
})
