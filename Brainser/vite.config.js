import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/Brainser/', // Set this to your repository name
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});