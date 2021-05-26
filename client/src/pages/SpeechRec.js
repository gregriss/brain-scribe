import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import API from "../utils/API";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

const styles = {
    button: {
        // background: 'hsl(239, 75%, 70%)',
        background: 'hsl(239, 65%, 55%)',
        height: '60px',
        width: '60px',
        border: '1px solid #DDD',
        margin: '6px 3px',
        padding: '0',
        alignContent: 'center'
    }
}

const SpeechRec = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [formObject, setFormObject] = useState({})

    const commands = [
        {
            command: 'hello',
            callback: () => setMessage('Hi there!')
        },
        {
            command: 'how\'s it going',
            callback: () => setMessage('Pretty well. How about you?')
        },
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'clear',
            callback: () => resetTranscript()
        },
        {
            command: 'stop',
            callback: () => stopMic()
        },
        {
            command: 'title is *',
            callback: (title) => {
                setMessage(`Changing the Title to ${title}...`)
                // document.getElementById('title').value = title
                setTitle(title)
            }
        },
        {
            command: 'make the title *',
            callback: (title) => {
                setMessage(`Changing the Title to ${title}...`)
                // document.getElementById('title').value = title
                setTitle(title)
            }
        },
        {
            command: 'the title is *',
            callback: (title) => setTitle(title)
            // document.getElementById('title').value = title
        },
        {
            command: 'my title is *',
            callback: (title) => setTitle(title)
        },
        {
            command: 'reset the title',
            callback: () => setTitle('')
        },
        {
            command: 'reset title',
            callback: () => setTitle('')
        },
        {
            command: 'author is *',
            callback: (author) => {
                setMessage(`Changing the Author to ${author}...`)
                setAuthor(author)
                // document.getElementById('author').value = author
            }
        },
        {
            command: 'make the author *',
            callback: (author) => {
                setMessage(`Changing the Author to ${author}...`)
                setAuthor(author)
                // document.getElementById('author').value = author
            }
        },
        {
            command: 'the author is *',
            callback: (author) => {
                setMessage(`Changing the Author to ${author}...`)
                setAuthor(author)
                // document.getElementById('author').value = author
            }
        },
        {
            command: 'my author is *',
            callback: (author) => setAuthor(author)
        },
        {
            command: 'reset author',
            callback: () => setAuthor('')
        },
        {
            command: 'reset the author',
            callback: () => setAuthor('')
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
            command: 'go back to the ideas page',
            callback: () => {
                stopMic()
                window.location.replace("https://brain-scribe.herokuapp.com/ideas")
            }
        },
        {
            command: 'go back to ideas page',
            callback: () => {
                stopMic()
                window.location.replace("https://brain-scribe.herokuapp.com/ideas")
            }
        },
        {
            command: 'go home',
            callback: () => {
                stopMic()
                window.location.replace("https://brain-scribe.herokuapp.com/ideas")
            }
        },
        {
            command: 'go to homepage',
            callback: () => {
                stopMic()
                window.location.replace("https://brain-scribe.herokuapp.com/ideas")
            }
        },
        {
            command: 'save this idea',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    // content: transcript
                    content: document.getElementById('content').value
                })
                setMessage('Saving Now! :)')
            }
        },
        {
            command: 'save my idea',
            callback: () => {
                SpeechRecognition.stopListening()
                API.saveIdea({
                    title: title,
                    author: author,
                    content: transcript
                    // title: document.getElementById('title').value,
                    // author: document.getElementById('author').value,
                    // // content: transcript
                    // content: document.getElementById('content').value
                })
                setMessage('Saving Now! :)')
            }
        },
        {
            command: 'save idea',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    // content: transcript
                    content: document.getElementById('content').value
                })
                setMessage('Idea saving :)')
            }
        },
        {
            command: 'save',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    // content: transcript
                    content: document.getElementById('content').value
                })
                setMessage('Done :)')
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

    // check out whether I can update TextArea state in a useEffect
    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US',
        });
        document.getElementById('record-btn').style.background = '#ff4d4d';
        document.getElementById('header-text').textContent = 'Recording!';
        document.getElementById('header-text').style.color = '#ff4d4d'
    };

    const stopMic = () => {
        SpeechRecognition.stopListening({
            // object?
        })
        console.log('Stop Recording');
        document.getElementById('record-btn').style.background = 'hsl(239, 65%, 55%)';
        document.getElementById('header-text').textContent = 'Speech to Text';
        document.getElementById('header-text').style.color = 'hsl(239, 75%, 40%)';
    }
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormObject({ ...formObject, [name]: value })
        console.log(value);
    };

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

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
        return (
            <Container fluid>
                <div
                    style={{ margin: '3rem' }}
                >
                    <h2
                        style={{ color: '#33334d' }}
                    >
                        Your browser does not support speech recognition software! Try Chrome desktop, maybe?
                    </h2>
                    <div style={{ marginTop: '1rem' }}>
                        <Link
                            to="/ideas"
                            className="text-info"
                        >
                            ← Back to Ideas/Home
                        </Link>
                    </div>
                </div>
            </Container >
        )
    } else {
        return (
            <Container fluid>
                <Row>
                    <Col size="xl-6 lg-9 md-12">
                        <Jumbotron>
                            <h1 id="header-text">
                                Speech to Text
                            </h1>
                        </Jumbotron>
                        <form>
                            <div>
                                <h2>
                                    Listening for Speech:
                                {' '}
                                    {listening ? 'On' : 'Off'}
                                </h2>
                            </div>
                            <div>
                                <button className="btn btn-lg" style={styles.button} type="button" onClick={resetTranscript}><img src={'/reset-icon.svg'} alt='reset' /></button>
                                <button className="btn btn-lg" style={styles.button} type="button" onClick={stopMic}><img src={'/stop-icon.svg'} alt='stop' /></button>
                                <button id="record-btn" className="btn btn-lg" style={styles.button} type="button" onClick={listenContinuously}><img src={'/mic-icon.svg'} alt='record' /></button>
                                <Link to="/ideas" style={{ color: "hsl(239, 75%, 40%)", float: "right" }}>← Back to Ideas/Home</Link>
                            </div>
                            <Input
                                id="title"
                                name="title"
                                value={title}
                                placeholder="Title (required)"
                                onChange={handleInputChange}
                            />
                            <Input
                                id="author"
                                name="author"
                                value={author}
                                placeholder="Author (required)"
                                onChange={handleInputChange}
                            />
                            <TextArea
                                id="content"
                                name="content"
                                defaultValue={transcript}
                                // value={transcript}
                                placeholder="(Transcript will appear here)"
                                onChange={handleInputChange}
                            >
                            </TextArea>
                            <h4>BrainScribe Says:</h4>
                            <textarea
                                id="brainscribe-message"
                                placeholder="Your Wish is My Command..."
                                value={message}
                                // onChange={handleInputChange}
                                style={{ border: '1px solid #DDD', borderRadius: '4px', minHeight: '50px', width: '100%', marginBottom: '6px' }}
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
}

export default SpeechRec;