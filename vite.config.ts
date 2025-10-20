import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects',
          dest: '.',
        },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches Netlify's expected output directory
    rollupOptions: {
      // Optional: Explicitly include _redirects if needed
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // No need to list _redirects here; viteStaticCopy handles it
      },
    },
  },
}));
