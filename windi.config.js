import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: true,
  preflight: true,
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
        bgPrimary: 'hsl(222, 26%, 31%)',
        bgSecondary: 'hsl(223, 31%, 20%)',
        bgTertiary: 'hsl(224, 36%, 15%)',
        keyBgPrimary: 'hsl(30, 25%, 89%)',
        keyShadowPrimary: 'hsl(28, 16%, 65%)',
        keyBgSecondary: 'hsl(225, 21%, 49%)',
        keyShadowSecondary: 'hsl(224, 28%, 35%)',
        keyBgTertiary: 'hsl(6, 63%, 50%)',
        keyShadowTertiary: 'hsl(6, 70%, 34%)',
        textPrimary: 'hsl(221, 14%, 31%)',
      },
      fontFamily: {
        sans: ['Spartan', 'sans-serif'],
      },
    },
  },
})
