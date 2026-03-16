import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // __dirname：Nodejs自带的全局对象，用来获取当前文件所在目录的绝对路径
      "@": path.resolve(__dirname, 'src')
    }
  }
})
