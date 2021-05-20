require('dotenv').config();
const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

const Text = {
    getText: async function () {
        const client = new speech.SpeechClient();
        // const filename = path.join(__dirname, '../resources/bennerst.flac');
        // const filename = path.join(__dirname, '../resources/test.wav');
        const filename = path.join(__dirname, '../resources/speech.mp3');

        const file = fs.readFileSync(filename);
        const audioBytes = file.toString('base64');

        const audio = {
            content: audioBytes
        };

        // TODO conditional statement here? To check which encoding?
        // for mp3 files (works, 1 audio channel)
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 44100,
            audioChannelCount: 1,
            languageCode: 'en-US'
        }
        // for wav files (works)
        // const config = {
        //     encoding: 'LINEAR16',
        //     sampleRateHertz: 44100,
        //     audioChannelCount: 2,
        //     languageCode: 'en-US'
        // }
        // for FLAC (works)
        // const config = {
        //     encoding: 'FLAC',
        //     sampleRateHertz: 48000,
        //     audioChannelCount: 2,
        //     languageCode: 'en-US'
        // };

        const request = {
            audio: audio,
            config: config
        };

        const [response] = await client.recognize(request);
        console.log(response);

        const transcription = response.results.map(result =>
            result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: ${transcription}`);
        // res.json(transcription);
        // res.send(console.log(`Transcription: ${transcription}`));

        // res.json(transcription);
        return transcription;
    }
}

module.exports = Text;