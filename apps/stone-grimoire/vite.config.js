import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          cathedral: ['@cathedral/synthesis-engine', '@cathedral/three-engine']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cathedral': path.resolve(__dirname, '../'),
      '@packages': path.resolve(__dirname, '../packages'),
      '@effects': path.resolve(__dirname, '../effects'),
      '@assets': path.resolve(__dirname, '../assets')
    }
  },
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@cathedral/synthesis-engine',
      '@cathedral/three-engine'
    ]
  }
});
