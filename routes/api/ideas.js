const router = require("express").Router();
const ideasController = require("../../controllers/ideasController");
// const { getText } = require("../../controllers/speechController");

// Matches with "/api/ideas"
router.route("/")
  .get(ideasController.findAll)
  .post(ideasController.create);

// Matches with "/api/ideas/:id"
router
  .route("/:id")
  .get(ideasController.findById)
  .put(ideasController.update)
  .delete(ideasController.remove);

module.exports = router;