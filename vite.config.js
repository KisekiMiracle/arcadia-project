import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        404: resolve(__dirname, "pages/404.html"),
        index: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home.html"),
        characters: resolve(__dirname, "pages/characters.html"),
      },
    },
  },
});
