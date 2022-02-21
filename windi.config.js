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
        keyShadowPrimary: '#b4a597',
        keyBgSecondary: '#637097',
        keyShadowSecondary: '#404e72',
        keyBgTertiary: '#d03f2f',
        keyShadowTertiary: '#93261a',
        textPrimary: '#444b5a',
      },
      fontFamily: {
        sans: ['Spartan', 'sans-serif'],
      },
    },
  },
})
