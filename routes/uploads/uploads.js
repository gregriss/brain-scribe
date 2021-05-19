const router = require("express").Router();
// const fileUpload = require("express-fileupload");


// get uploads route
router.get('/test', (req, res) => {
    res.json(true);
})

router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/resources/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/resources/${file.name}` });
    });
})

module.exports = router;