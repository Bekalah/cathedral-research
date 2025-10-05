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
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      // Map @cathedral/<pkg> to local packages source for dev
      { find: /^@cathedral\/(.*)$/, replacement: path.resolve(__dirname, '../../packages/$1/src') },
      { find: '@packages', replacement: path.resolve(__dirname, '../../packages') },
      { find: '@effects', replacement: path.resolve(__dirname, '../../effects') },
      { find: '@assets', replacement: path.resolve(__dirname, '../../assets') }
    ]
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
