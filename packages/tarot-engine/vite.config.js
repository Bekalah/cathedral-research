import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'books/cathedral/cathedral-hub.html'
      }
    }
  },
  publicDir: 'books'
});
