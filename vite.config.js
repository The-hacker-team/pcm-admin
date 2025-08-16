import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Disable offline caching - only cache essential files
        globPatterns: [],
        skipWaiting: true,
        clientsClaim: true,
        // Custom service worker that requires network
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*$/,
            handler: "NetworkOnly", // Always fetch from network, no cache
          },
          {
            urlPattern: /.*/,
            handler: "NetworkOnly", // All requests must go through network
          },
        ],
      },
      strategies: "generateSW",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "PCM Admin Dashboard",
        short_name: "PCM Admin",
        description: "Online-Only Progressive Web App for PCM Administration",
        theme_color: "#228be6",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
