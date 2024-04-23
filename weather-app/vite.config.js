import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      // Add the path to the problematic dependency here
      '/workspaces/WeatherApp/weather-app/node_modules/.vite/deps/chunk-4YP5LC2O.js?v=f4717c0d',
    ],
  },
});
