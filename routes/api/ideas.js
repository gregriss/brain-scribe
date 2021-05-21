const router = require("express").Router();
const ideasController = require("../../controllers/ideasController");
const { getText } = require("../../controllers/speechController");

const multer = require('multer') //use multer to upload blob data
const upload = multer(); // setup the multer

// Matches with "/api/ideas"
router.route("/")
  .get(ideasController.findAll)
  .post(ideasController.create);

// TODO put in controller
// Matches "api/ideas/text"
// this isn't needed
// router.post('/text', async (req, res) => {

//   let uploadLocation = __dirname + '/resources/' + req.body.file.name;
//   // write the BLOB to the server as a file
//   console.log("this is in post request" + req.body);
//   // getText().then(data => res.json(data)).catch(err => res.json(err));

//   // const textToRecords = await getText(uploadLocation).then(data => data).catch(err => err);

// this is for mongoDB
//   // // const recording = await Recording.create({ name: textToRecords.file.name });
//   // console.log("Hey this is the thing" + textToRecords);
//   return res.json({
//     message: "A new recording as been added to the list",
//     status: 201,
//     // data: recording
//     data: []
//   });

// });

// Matches with "/api/ideas/:id"
router
  .route("/:id")
  .get(ideasController.findById)
  .put(ideasController.update)
  .delete(ideasController.remove);

module.exports = router;