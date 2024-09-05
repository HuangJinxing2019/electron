import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path';

const root = process.cwd();
const pathResolve = (pathname) => resolve(root, '.', pathname);
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.vue', '.js'],
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  server: {
    port: 8888,
  }
})
