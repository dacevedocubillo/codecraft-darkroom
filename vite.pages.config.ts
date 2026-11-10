import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Dedicated static build. The Lovable Vite config remains untouched.
export default defineConfig({
  base: "/codecraft-darkroom/",
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      router: { basepath: "/codecraft-darkroom" },
      spa: { enabled: true, prerender: { crawlLinks: true } },
      prerender: { failOnError: true },
      sitemap: { host: "https://dacevedocubillo.github.io" },
    }),
    react(),
  ],
});
