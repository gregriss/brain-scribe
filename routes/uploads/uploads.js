const router = require("express").Router();
const path = require('path');
const { getText } = require("../../controllers/speechController");
const db = require("../../models");

// get uploads test route; hits /uploads/files/test
router.get('/test', (req, res) => {
    res.json(true);
});

// post route for uploaded file 
// This moves file to the resources folder so that Google API can access it
router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    const filepath = path.join(__dirname, `../../resources/${file.name}`);
    const ext = file.name.split('.').pop();

    // if (ext === 'txt') {
    //     const textResult = {
    //         title: file.name,
    //         author: "Current User",
    //         content: JSON.stringify(file.data)
    //     }
    //     const textIdea = db.Idea
    //         .create(textResult)
    //         .then(data => data).catch(err => console.error(err));

    //     res.json(textIdea);
    // } else if (ext !== 'flac' && ext !== 'mp3' && ext !== 'wav') {
    //     console.log('incorrect file type');
    // }
    // file.mv(`${__dirname}/resources/${file.name}`, err => {
    file.mv(filepath, async err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        const transcription = await getText(filepath, ext).then(data => data).catch(err => err);
        const recording = {
            title: file.name,
            author: "Audio Recording",
            content: transcription
        }

        const results = await db.Idea
            .create(recording)
            .then(data => data).catch(err => console.error(err));
        console.log(results);
        res.json(results);
        // res.json({ fileName: file.name, filePath: `/resources/${file.name}` });
    });
    // console.log(file);
    // console.log('req.files: ' + req.files)
})

module.exports = router;