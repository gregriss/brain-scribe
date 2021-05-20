const router = require("express").Router();
const ideasController = require("../../controllers/ideasController");
const { getText } = require("../../controllers/speechController");

// Matches with "/api/ideas"
router.route("/")
  .get(ideasController.findAll)
  .post(ideasController.create);

// TODO put in controller
// Matches "api/ideas/text"
router.get('/text', (req, res) => {
  getText().then(data => res.json(data)).catch(err => res.json(err));
});

// Matches with "/api/ideas/:id"
router
  .route("/:id")
  .get(ideasController.findById)
  .put(ideasController.update)
  .delete(ideasController.remove);

module.exports = router;