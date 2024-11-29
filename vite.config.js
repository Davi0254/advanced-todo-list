import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],   
  base: "advanced-todo-list",
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/cert.pem')),
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://localhost:3000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})

