const speech = require('@google-cloud/speech');
const fs = require('fs');
require('dotenv').config();

async function main() {
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
}

main().catch(console.err);

// Creates a client
// const client = new speech.SpeechClient();

// async function quickstart() {
//     // The path to the remote LINEAR16 file
//     const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

//     // The audio file's encoding, sample rate in hertz, and BCP-47 language code
//     const audio = {
//         uri: gcsUri,
//     };
//     const config = {
//         encoding: 'LINEAR16',
//         sampleRateHertz: 16000,
//         languageCode: 'en-US',
//     };
//     const request = {
//         audio: audio,
//         config: config,
//     };

//     // Detects speech in the audio file
//     const [response] = await client.recognize(request);
//     const transcription = response.results
//         .map(result => result.alternatives[0].transcript)
//         .join('\n');
//     console.log(`Transcription: ${transcription}`);
// }
// quickstart();