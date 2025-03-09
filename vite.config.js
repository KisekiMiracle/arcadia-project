import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: "reload", // via: https://stackoverflow.com/questions/77461040/can-i-get-vite-to-reload-the-browser-on-every-html-change
      configureServer(server) {
        const { ws, watcher } = server;
        watcher.on("change", (file) => {
          if (file.endsWith(".html") || file.endsWith(".css") || file.endsWith(".js")) {
            ws.send({
              type: "full-reload",
            });
          }
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        404: resolve(__dirname, "pages/404.html"),
        index: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home.html"),
        characters: resolve(__dirname, "pages/characters.html"),
        report: resolve(__dirname, "pages/report.html"),
        devlog: resolve(__dirname, "pages/devlog.html"),
        template_devlog: resolve(__dirname, "pages/devlog/devlogTemplate.html"),
        component_articleCard: resolve(__dirname, "src/assets/components/article_card.html"),
      },
    },
  },
});
