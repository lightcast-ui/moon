import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ insertTypesEntry: true, include: ["src/**/*.{ts,tsx}"] }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Moon",
      fileName: (format) => `moon.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // Dependencies that shouldn't be bundled into the library
      external: [...Object.keys(dependencies), /^react\/jsx-runtime$/],
      output: {
        // Global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
