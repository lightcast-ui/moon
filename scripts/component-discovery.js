import { readdirSync } from "fs";
import { join } from "path";

/**
 * Discovers component files in the components directory and generates
 * export paths for package.json
 *
 * @param {string} componentsRoot - Path to the components directory
 * @returns {Object} - Object with export paths as keys and module paths as values
 */
export function discoverComponentExports(componentsRoot) {
  // Base exports object
  const exports = {
    ".": {
      import: "./dist/index.js",
      require: "./dist/index.cjs",
      types: "./dist/index.d.ts",
    },
    "./styles.css": "./dist/assets/index.css",
  };

  // Function to recursively process component directories
  function processComponentDirectory(dirPath, basePath = "") {
    const entries = readdirSync(dirPath, { withFileTypes: true });

    // Process files first
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith(".tsx") &&
          !entry.name.startsWith("_")
      )
      .forEach((entry) => {
        const componentName = entry.name.replace(".tsx", "");
        const relativePath = join(basePath, componentName).replace(/\\/g, "/");
        const distPath = join("components", basePath, componentName).replace(
          /\\/g,
          "/"
        );

        exports[`./${relativePath}`] = {
          import: `./dist/${distPath}.js`,
          require: `./dist/${distPath}.cjs`,
          types: `./dist/${distPath}.d.ts`,
        };
      });

    // Process subdirectories
    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const subdirPath = join(dirPath, entry.name);
        const newBasePath = join(basePath, entry.name);
        processComponentDirectory(subdirPath, newBasePath);
      });
  }

  // Start processing from components root
  processComponentDirectory(componentsRoot);

  return exports;
}
