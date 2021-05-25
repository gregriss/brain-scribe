import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import API from "../utils/API";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

const styles = {
    button: {
        background: 'hsl(239, 75%, 70%)',
        height: '60px',
        width: '60px',
        border: '1px solid #DDD',
        margin: '6px 2px',
        padding: '0',
        alignContent: 'center'
    }
}

const SpeechRec = () => {
    const [message, setMessage] = useState('');
    const [formObject, setFormObject] = useState({})
    const commands = [
        {
            command: 'hello',
            callback: () => setMessage('Hi there!')
        },
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'reset everything',
            callback: () => document.body.style = 'initial'
        },
        {
            command: 'clear',
            callback: () => resetTranscript()
        },
        {
            command: 'stop',
            callback: () => SpeechRecognition.stopListening()
        },
        {
            command: 'make the title *',
            callback: (title) => {
                setMessage(`Changing the Title to ${title}...`)
                document.getElementById('title').value = title
            }
        },
        {
            command: 'make the author *',
            callback: (author) => {
                setMessage(`Changing the Author to ${author}...`)
                document.getElementById('author').value = author
            }
        },
        {
            command: "Make the background *",
            callback: (color) => {
                setMessage('changing color...')
                document.body.style.background = color;
            }
        },
        {
            command: "make the font weight *",
            callback: (weight) => {
                setMessage(`Making Content text ${weight}!`)
                document.getElementById('content').style.fontWeight = weight
            }
        },
        {
            command: "make the text color *",
            callback: (color) => document.body.style.color = color
        },
        {
            command: "make the save button *",
            callback: (attribute) => document.getElementById('save-btn').style.background = attribute
        },
        {
            command: 'shut up',
            callback: () => setMessage('I wasn\'t talking.')
        },
        {
            command: 'open *',
            callback: (website) => {
                window.open("http://" + (website.split(" ").join("")) + ".com");
            }
        },
        {
            command: 'go back to ideas page',
            callback: () => {
                window.open("http://localhost:3000/ideas")
            }
        },
        {
            command: 'save this idea',
            callback: () => {
                API.saveIdea({
                    title: (formObject.title ? formObject.title : 'Idea Title'),
                    author: (formObject.author ? formObject.author : 'Idea Author'),
                    content: transcript
                })
            }
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

    // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    //     return null;
    // }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US',
        });
    };

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
        // console.log(value);
    };

    function handleTyping(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    }
    // When the form is submitted, use the API.saveIdea method to save the idea data
    // Then reload ideas from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveIdea({
                title: formObject.title,
                author: formObject.author,
                content: transcript
            })
                .then(res => resetTranscript())
                .then(res => setMessage('Idea Saved!!!'))
                .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1
                            id="header-text"
                        >
                            Speech to Text
                        </h1>
                    </Jumbotron>
                    <form>
                        <div>
                            <h2>
                                Listening for Speech:
                            {' '}
                                {listening ? 'on' : 'off'}
                            </h2>
                        </div>
                        <div>
                            <button className="btn btn-lg speech-btn" style={styles.button} type="button" onClick={resetTranscript}><img src={'/reset-icon.svg'} alt='reset' /></button>
                            <button className="btn btn-lg speech-btn" style={styles.button} type="button" onClick={SpeechRecognition.stopListening}><img src={'/stop-icon.svg'} alt='stop' /></button>
                            <button className="btn btn-lg speech-btn" style={styles.button} type="button" onClick={listenContinuously}><img src={'/mic-icon.svg'} alt='record' /></button>
                            <Link to="/ideas" style={{ color: "hsl(239, 75%, 40%)", float: "right", top: "5px" }}>← Back to Ideas</Link>
                        </div>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Title (required)"
                            // onReset={handleFormReset}
                            onChange={handleInputChange}
                        />
                        <Input
                            id="author"
                            name="author"
                            placeholder="Author (required)"
                            // onReset={handleFormReset}
                            onChange={handleInputChange}
                        />
                        <TextArea
                            id="content"
                            name="content"
                            value={transcript}
                            placeholder="(Transcript will appear here)"
                            onChange={handleInputChange}
                            onClick={handleTyping}
                        // value={finalTranscript}
                        >
                        </TextArea>
                        <h4>BrainScribe Says:</h4>
                        <textarea
                            id="brainscribe-message"
                            value={message}
                            onChange={handleInputChange}
                            style={{ border: '1px solid #DDD', borderRadius: '4px', minHeight: '75px', width: '100%', marginBottom: '6px' }}
                        >
                        </textarea>
                        <FormBtn
                            id="save-btn"
                            disabled={!(formObject.author && formObject.title)}
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