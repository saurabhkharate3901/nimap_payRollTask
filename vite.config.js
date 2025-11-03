import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://qa.fieldforceconnect.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // optional: remove "/api" prefix if needed
      },
    },
  },
});
