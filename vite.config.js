import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild:{
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
  },
  
  plugins: [
    vue(),
  ],
  server: {

    host: '127.0.0.1',

    port: '8000',    // 指定的本地启动端口
    proxy: {
      '/api': {     // 你想代理的请求
        target: 'http://60.205.14.77:8998/',        // target是你想请求的后端地址
        changeOrigin: true,    // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      },
      '/baiduapi': {
        target: 'https://aip.baidubce.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/baiduapi/, '')
      },
      '/fanyi': {
        target: 'https://fanyi-api.baidu.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fanyi/, '')
      },
      '/smmsapi': {
        target: 'https://smms.app/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/smmsapi/, '')
      }
    }
  },     // 实际请求中的写法：axois.post('/api/xxx', data) 【所以不需要配置axios的baseUrl了】

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
