// import React from "react";
// import PropTypes from "prop-types";
// import SpeechRecognition from "react-speech-recognition";
// // import { List, ListItem } from "../components/List";

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Container, Row, Col } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

const SpeechRec = () => {
    const [message, setMessage] = useState('');
    const [formObject, setFormObject] = useState({})
    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'stop',
            callback: () => SpeechRecognition.stopListening()
        },
        {
            command: 'shut up',
            callback: () => setMessage('I wasn\'t talking.')
        },
        {
            command: 'Hello',
            callback: () => setMessage('Hi there!')
        },
        {
            command: 'clear',
            callback: () => resetTranscript()
        }
    ]
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            // language: 'en-US',
        });
    };

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveIdea method to save the idea data
    // Then reload ideas from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveIdea({
                title: formObject.title,
                author: formObject.author,
                content: formObject.content
            })
                .then(res => resetTranscript())
                .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <form>
                        <div>
                            <h2>
                                Listening:
                            {' '}
                                {listening ? 'on' : 'off'}
                            </h2>
                        </div>
                        <div>
                            <button type="button" onClick={resetTranscript}>Reset</button>
                            <button type="button" onClick={listenContinuously}>Listen</button>
                            <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
                        </div>
                        <Input
                            id="title"
                            // onReset={handleFormReset}
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                        />
                        <Input
                            id="author"
                            // onReset={handleFormReset}
                            onChange={handleInputChange}
                            name="author"
                            placeholder="Author (required)"
                        />
                        <TextArea
                            defaultValue={transcript}
                        >
                        </TextArea>
                        <h4>BrainScribe Says:</h4>
                        <div
                            value={message}
                            style={{ border: '1px solid #DDD', minHeight: '75px' }}
                        >
                        </div>
                        <FormBtn
                            // disabled={!(formObject.author && formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Save Idea
                        </FormBtn>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default SpeechRec;



// React version...I need to update React version
// function SpeechRec() {
//     const propTypes = {
//         transcript: PropTypes.string,
//         resetTranscript: PropTypes.func,
//         browserSupportsSpeechRecognition: PropTypes.bool,
//         startListening: PropTypes.func,
//         recognition: PropTypes.object
//     }

//     const options = {
//         autoStart: false,
//         continuous: false
//     }

//     function record() {
//         let recognition = this.props.recognition
//         recognition.start()
//         recognition.onresult = (event) => {
//             let voiceLength = event.results[0][0].transcript.split("")
//             this.setState({ result: event.results[0][0].transcript })
//             this.check(this.state.result)
//         }
//         recognition.onspeechend = () => {
//             recognition.stop()
//         }
//     }

//     return (
//         <Container fluid>
//             <Row>
//                 <Col size="md-6">
//                     <div>
//                         <h1>Add a New Idea</h1>

//                         <button
//                             onClick={record()}>REC</button>
//                     </div>
//                     <form>
//                         <Input
//                             id="title"
//                             //   onChange={handleInputChange}
//                             // onReset={handleFormReset}
//                             name="title"
//                             placeholder="Title (required)"
//                         />
//                         <Input
//                             id="author"
//                             //   onChange={handleInputChange}
//                             // onReset={handleFormReset}
//                             name="author"
//                             placeholder="Author (required)"
//                         />
//                         <TextArea
//                             id="content"
//                             //   onChange={handleInputChange}
//                             // onReset={handleFormReset}
//                             name="content"
//                             placeholder="Content (Optional)"
//                         />
//                         <FormBtn
//                         // disabled={!(formObject.author && formObject.title)}
//                         // onClick={handleFormSubmit}
//                         >
//                             Save Idea
//               </FormBtn>
//                     </form>
//                 </Col>
//                 <Col size="md-6 sm-12">
//                     <h1>My Ideas</h1>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

// export default SpeechRec;