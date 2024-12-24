import { defineConfig, loadEnv } from 'vite'  // Add loadEnv import
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      outDir: '../backend-AirBnb/public',
      emptyOutDir: true,
    },
    server: {
      hmr: true,
    },
    // Environment variables configuration
    define: {
      'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY)
    }
  }
})