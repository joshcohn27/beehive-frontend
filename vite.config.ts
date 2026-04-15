import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  root: __dirname,

  plugins: [react()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },

  build: {
    outDir: "./dist",
    emptyOutDir: true
  },

  server: {
    proxy: {
      // Frontend calls /api/*, Vite forwards to backend
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  }
});
