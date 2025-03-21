import { defineConfig } from "vite";
import { resolve } from "node:path";
import { dependencies, peerDependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Moon",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // Dependencies that shouldn't be bundled into the library
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        /^react\/jsx-runtime$/,
      ],
      output: {
        // Global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
