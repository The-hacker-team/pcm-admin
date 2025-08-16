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
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        categories: ["business", "productivity", "utilities"],
        lang: "en",
        icons: [
          {
            src: "pwa-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
