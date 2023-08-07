/// <reference types="vitest" />
// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import AutoImport from "unplugin-auto-import/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      'vuetify/lib/components/VSlider/index.mjs',
      'vuetify/lib/components/VProgressCircular/index.mjs',
      'vuetify/lib/components/VTable/index.mjs',
      'vuetify/lib/components/VChip/index.mjs',
      'vuetify/lib/components/VCheckbox/index.mjs',
      'vuetify/lib/components/VLayout/index.mjs',
      'vuetify/lib/components/VSwitch/index.mjs',
      'vuetify/lib/components/VOverlay/index.mjs',
      'vuetify/lib/components/VFileInput/index.mjs',
      'vuetify/lib/components/VTimeline/index.mjs',
      'vuetify/lib/components/VForm/index.mjs',
    ],
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: { configFile: "src/styles/variables.scss" },
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
    }),
  ],
  define: { "process.env": {} },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    host: '0.0.0.0',
    port: 4399,
    proxy: {
      "/rfc" :{
        changeOrigin: true,
        secure: false,
        ws: true,
        target: "https://www.rfc-editor.org"
      },
      "/html" :{
        changeOrigin: true,
        secure: false,
        ws: true,
        target: "https://datatracker.ietf.org/doc"
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false },
      css: { charset: false },
    },
  },
  cacheDir: ".vite_cache", // 将缓存目录设置为项目根目录下的 .vite_cache 文件夹
});
