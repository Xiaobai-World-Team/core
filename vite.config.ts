import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/storage": 'http://localhost:3001/',
      "/store": 'http://localhost:3001/'
    }
  }
})
