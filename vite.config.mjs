import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Your static files directory
  build: {
    outDir: '../dist', // Output directory for build files
    emptyOutDir: true, // Clear the output directory before building
  },
  server: {
    port: process.env.VITE_PORT || 3100,
    https: {
      key: './cert/localhost.key',
      cert: './cert/localhost.crt'
    },
  },
});
