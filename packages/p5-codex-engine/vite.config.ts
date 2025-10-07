import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'P5CodexEngine',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['p5', 'chroma-js', 'react', 'react-dom'],
      output: {
        globals: {
          'p5': 'p5',
          'chroma-js': 'chroma',
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['p5', 'chroma-js']
  }
})