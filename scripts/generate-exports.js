import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json using fs instead of import
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

/**
 * Discovers component files in the components directory and generates
 * export paths for package.json
 */
function discoverComponentExports(componentsRoot) {
  // Base exports object
  const exports = {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.js",
      require: "./dist/index.cjs",
    },
    "./styles.css": "./dist/assets/index.css",
  };

  // Function to recursively process component directories
  function processComponentDirectory(dirPath, basePath = "") {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

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
        // Remove "ui/" from the path - using only the component name
        const exportPath = componentName;
        const distPath = path
          .join("components", basePath, componentName)
          .replace(/\\/g, "/");

        exports[`./${exportPath}`] = {
          types: `./dist/${distPath}.d.ts`,
          import: `./dist/${distPath}.js`,
          require: `./dist/${distPath}.cjs`,
        };
      });

    // We're not processing subdirectories for the flattened structure
  }

  // Start processing only the UI components directory
  const uiComponentsDir = path.join(componentsRoot, "ui");
  if (fs.existsSync(uiComponentsDir)) {
    processComponentDirectory(uiComponentsDir, "ui");
  }

  return exports;
}

// Components root directory
const componentsRoot = path.join(__dirname, "..", "src/components");

// Generate exports
const exports = discoverComponentExports(componentsRoot);

// Update package.json
packageJson.exports = exports;

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

// Count and display the total number of export paths
const exportCount = Object.keys(exports).length - 2; // Subtract the main export and CSS export
console.log(`Updated package.json with ${exportCount} component exports.`);

// Print out all the export paths for verification
console.log("\nExport paths:");
Object.keys(exports)
  .filter((key) => key !== "." && key !== "./styles.css")
  .sort()
  .forEach((key) => console.log(`  ${key}`));
