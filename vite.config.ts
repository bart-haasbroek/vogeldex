import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8889',  // Dit is de poort waarop Netlify Dev draait
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions/, ''),
      },
    },
  },
})
