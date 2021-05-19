const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const uploadRoutes = require("./uploads");

// API Routes
router.use("/api", apiRoutes);

// Upload route
router.use("/uploads", uploadRoutes);

// If no API or Upload routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
