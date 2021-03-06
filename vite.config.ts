import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/core-backend',
  server: {
    port: 3005,
    proxy: {
      "/storage": 'http://localhost:3001/',
      "/store": 'http://localhost:3001/',
      "/user": 'http://localhost:3001/'
    }
  }
})
