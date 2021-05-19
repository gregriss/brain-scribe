const router = require("express").Router();


// get uploads route
router.get('/test', (req, res) => {
    res.json(true);
})

// post route for uploaded image
// can I route this to the resources folder so that Google API could access it?
// can I upload something other than images?
router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    // file.mv(`${__dirname}/resources/${file.name}`, err => {
    file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // res.json({ fileName: file.name, filePath: `/resources/images/${file.name}` });
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
})

module.exports = router;