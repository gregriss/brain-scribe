const router = require("express").Router();
const ideasController = require("../../controllers/ideasController");

const speech = require('@google-cloud/speech');
const fs = require('fs');
require('dotenv').config();

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

router.get('/test', (req, res) => {
  //   // let testData = { test: 'testing route' };
  //   // req.body = testData;
  //   // res.json(testData);
  //   // console.log('test route hit');
  //   res.json(req.body)
  //     .catch(err => res.status(422).json(err));

  // res.status(200).send('ok');
  async function getSpeech() {
    const client = new speech.SpeechClient();
    const filename = '../../resources/benner-st.flac';

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
    console.log(`Transcription: ${transcription}`);
    // return transcription;
    // return res.json(transcription);
    // // }
    // getSpeech().catch(console.error);
    res.json(response);
    console.log(response)
  }
});

module.exports = router;