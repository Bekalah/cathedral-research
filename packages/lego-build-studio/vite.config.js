import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@cathedral': resolve(__dirname, '../')
    }
  },
  server: {
    port: 3005,
    host: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'LegoBuildStudio',
      fileName: 'lego-build-studio'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'three'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE'
        }
      }
    }
  }
})
