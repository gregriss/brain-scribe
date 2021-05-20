const router = require("express").Router();
const path = require('path');

// get uploads test route; hits /uploads/files/test
router.get('/test', (req, res) => {
    res.json(true);
})

// post route for uploaded file
// This moves file to the resources folder so that Google API can access it
// I coud put this function inside a controller
router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    // file.mv(`${__dirname}/resources/${file.name}`, err => {
    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    file.mv(path.join(__dirname, `../../resources/${file.name}`), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/resources/${file.name}` });
    });
    // console.log(file);
    console.log(req.files)
})

module.exports = router;