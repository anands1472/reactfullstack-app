const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

console.log("Starting Express app...");

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cors());
require("./startup/routes")(app);
// secure proxy
require("./startup/secure")(app);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../client/build/index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Failed to send index.html:", err);
      res.status(500).send(err);
    }
  });
});

try {
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ Server failed to start:", err);
}
