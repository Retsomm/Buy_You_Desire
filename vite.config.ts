import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Buy_You_Desire/', // GitHub repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 確保在部署到 GitHub Pages 時路徑正確
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['redux', 'react-redux', 'redux-thunk'],
          ui: ['antd', 'react-hot-toast']
        }
      }
    }
  }
})
