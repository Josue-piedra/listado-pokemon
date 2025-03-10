import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  root: './',
  resolve: {
    alias: {
      '@': '/src',  // Asegúrate de que las rutas estén correctas
    },
  },
});
