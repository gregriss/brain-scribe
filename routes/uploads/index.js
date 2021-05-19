const router = require("express").Router();
const uploadRoutes = require("./uploads");

// Upload Routes /api/uploads
router.use("/files", uploadRoutes);

module.exports = router;