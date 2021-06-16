import { defineConfig } from 'vite'
import vue from '@vitejs/pl ugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3005,
    proxy: {
      "/storage": 'http://localhost:3001/',
      "/store": 'http://localhost:3001/'
    }
  }
})
