const router = require("express").Router();
const ideasController = require("../../controllers/ideasController");

require('dotenv').config();
const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

// Matches with "/api/ideas"
router.route("/")
  .get(ideasController.findAll)
  .post(ideasController.create);

router.get('/testing', (req, res) => {
  // res.json(false);
  async function getSpeech() {
    const client = new speech.SpeechClient();
    // console.log(__dirname);
    const filename = path.join(__dirname, '../../resources/bennerst.flac');

    const file = fs.readFileSync(filename);
    const audioBytes = file.toString('base64');

    const audio = {
      content: audioBytes
    };

    const config = {
      // encoding: 'LINEAR16',
      encoding: 'FLAC',
      sampleRateHertz: 48000,
      audioChannelCount: 2,
      languageCode: 'en-US'
    };

    const request = {
      audio: audio,
      config: config
    };

    const [response] = await client.recognize(request);

    const transcription = response.results.map(result =>
      result.alternatives[0].transcript).join('\n');
    // console.log(`Transcription: ${transcription}`);
    // res.json(transcription);
    // res.send(console.log(`Transcription: ${transcription}`));

    res.json(JSON.stringify(transcription));
  }
  getSpeech().catch(console.error);
});

// Matches with "/api/ideas/:id"
router
  .route("/:id")
  .get(ideasController.findById)
  .put(ideasController.update)
  .delete(ideasController.remove);

module.exports = router;