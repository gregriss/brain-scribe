const router = require("express").Router();
const ideaRoutes = require("./ideas");
const userRoutes = require("./user");

// Idea routes /api/ideas*
router.use("/ideas", ideaRoutes);
// User routes /api/user*
router.use("/user", userRoutes);

module.exports = router;
