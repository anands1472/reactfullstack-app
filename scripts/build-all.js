const fs = require("fs-extra");
const path = require("path");

const root = process.cwd();
const buildDir = path.join(root, "build");

// Step 1: Clear previous build
fs.removeSync(buildDir);

// Step 2: Run React build
require("child_process").execSync("npm run build --workspace=client", { stdio: "inherit" });

// Step 3: Copy server files
fs.mkdirpSync(path.join(buildDir, "server"));
fs.copySync("server/index.js", path.join(buildDir, "server/index.js"));
fs.copySync("server/package.json", path.join(buildDir, "server/package.json"));

// Step 4: Copy React build output
fs.copySync("client/build", path.join(buildDir, "client"));

// Step 5: Create minimal package.json to run server
fs.writeJsonSync(path.join(buildDir, "package.json"), {
  name: "final-build",
  version: "1.0.0",
  private: true,
  scripts: {
    start: "node server/index.js"
  }
});

console.log("✅ Complete build created at ./build");
