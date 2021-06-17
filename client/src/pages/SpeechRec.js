import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import API from "../utils/API";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

const styles = {
    button: {
        background: 'hsl(265, 75%, 30%)',
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
                setTitle(title)
            }
        },
        {
            command: 'make the title *',
            callback: (title) => {
                setMessage(`Changing the Title to ${title}...`)
                setTitle(title)
            }
        },
        {
            command: 'the title is *',
            callback: (title) => setTitle(title)
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
            }
        },
        {
            command: 'make the author *',
            callback: (author) => setAuthor(author)
        },
        {
            command: 'the author is *',
            callback: (author) => {
                setMessage(`Changing the Author to ${author}...`)
                setAuthor(author)
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
                    title: title,
                    author: author,
                    content: transcript
                })
                setMessage('Saving Now! :)')
            }
        },
        {
            command: 'save my idea',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: title,
                    author: author,
                    content: transcript
                })
                setMessage('Saving Now! :)')
            }
        },
        {
            command: 'save idea',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: title,
                    author: author,
                    content: transcript
                })
                setMessage('Idea saving :)')
            }
        },
        {
            command: 'save',
            callback: () => {
                stopMic()
                API.saveIdea({
                    title: title,
                    author: author,
                    content: transcript
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
            console.log('Final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    // starts the listening/transcription process, set to listen continuously (false would stop recording if speaker pauses)
    // sets language to English, change color of record button and Heading to tell user the app is recording!
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US',
        });
        document.getElementById('record-btn').style.background = '#E74724'; // #ff4d4d
        document.getElementById('header-text').textContent = 'Recording!';
        document.getElementById('header-text').style.color = '#E74724';
    };
    // stops recording/listening, changes record button and heading color back to normal setting
    const stopMic = () => {
        SpeechRecognition.stopListening({})
        console.log('Stop Recording');
        document.getElementById('record-btn').style.background = 'hsl(265, 75%, 30%)';
        document.getElementById('header-text').textContent = 'Speech to Text';
        document.getElementById('header-text').style.color = 'hsl(265, 75%, 30%)';
    }
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
        // console.log(value);
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (title && author) {
            API.saveIdea({
                title: title,
                author: author,
                content: transcript
            })
                .then(res => resetTranscript())
                .then(res => setMessage('Idea Saved!!!'))
                .catch(err => console.log(err));
        }
    };

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, or Edge.');
        return (
            <Container fluid>
                <div style={{ margin: '3rem' }}>
                    <h2 style={{ color: '#33334d' }}>
                        Your browser does not support speech recognition software! Try Chrome desktop, or Edge.
                    </h2>
                    <div style={{ marginTop: '1rem' }}>
                        <Link
                            to="/ideas"
                            className="text-info">
                            ← Back to Ideas/Home
                        </Link>
                    </div>
                </div>
            </Container>
        )
    } else {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1 id="header-text">
                                Speech to Text
                            </h1>
                        </Jumbotron>
                        <div className="card"
                            style={{ background: '#eeeef7', padding: '20px 30px', borderLeft: '4px solid #afafd0', borderBottom: '4px solid #8f8fbd' }}
                        >
                            <form>
                                <div>
                                    <h2 style={{ color: 'hsl(265, 75%, 30%)' }}>
                                        Listening for Speech:
                                {' '}
                                        {listening ? 'On' : 'Off'}
                                    </h2>
                                </div>
                                <div style={{ color: '#FFF', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <button className="btn btn-lg" style={styles.button} type="button" onClick={resetTranscript}><img src={'/reset-icon.svg'} alt='reset' /></button>
                                        <button className="btn btn-lg" style={styles.button} type="button" onClick={stopMic}><img src={'/stop-icon.svg'} alt='stop' /></button>
                                        <button id="record-btn" className="btn btn-lg" style={styles.button} type="button" onClick={listenContinuously}><img src={'/mic-icon-white.svg'} alt='record' /></button>
                                    </div>
                                    <h4><Link to="/ideas" style={{ color: "hsl(239, 75%, 40%)" }}>← Back to Ideas/Home</Link></h4>
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
                                    defaultValue={message}
                                    // onChange={handleInputChange}
                                    style={{ border: '1px solid #DDD', borderRadius: '4px', minHeight: '50px', width: '100%', marginBottom: '6px' }}
                                >
                                </textarea>
                                <FormBtn
                                    id="save-btn"
                                    disabled={!author || !title}
                                    onClick={handleFormSubmit}
                                >
                                    Save Idea
                            </FormBtn>
                            </form>
                        </div>
                    </Col>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>
                                Helpful Hints
                            </h1>
                        </Jumbotron>
                        <div className="card"
                            style={{ background: '#eeeef7', color: 'hsl(265, 75%, 30%)', padding: '20px 30px', borderLeft: '4px solid #afafd0', borderBottom: '4px solid #8f8fbd' }}
                        >
                            {/* <h3>Making an Entry</h3> */}
                            <ul style={{ margin: '10px 10px 10px -20px' }}>
                                <li>
                                    First, Click the Record Button (Purple Mic Icon) The button will turn <strong style={{ color: '#E74724' }}>red</strong> if BrainScribe is recording.
                                </li>
                                <hr />
                                <li>
                                    Try saying <strong>"title is ..."</strong> and then your Title to set the title input. <strong>"My title is ..."</strong>, <strong>"The title is..."</strong> or <strong>"make the title..."</strong> also work.
                                </li>
                                <hr />
                                <li>
                                    Try saying <strong>"author is ..."</strong> and then your Author name to set the title input. Similar re-wording works here as for the title.
                                </li>
                                <hr />
                                <li>
                                    <strong>"Stop"</strong> will pause/stop the app from listening/transcribing your speech, but press Record again to pick up where you left off.
                                </li>
                                <hr />
                                <li>
                                    Say <strong>"reset"</strong> to reset the Transcript input field. The Software performs better if there is a slight pause before uttering the command.
                                </li>
                                <hr />
                                <li>
                                    Click the Green `Save Idea` Button to save, or if BrainScribe is still recording, try saying <strong>"save this idea"</strong>.
                                </li>
                                <hr />
                                <li>
                                    You can say <strong>"open ..."</strong> plus the name of a web page, and the browser opens that page in a new tab. For example, <strong>"Open Google"</strong> will open `https://www.google.com/`.
                                </li>
                                <hr />
                                <li>
                                    If the color scheme is too boring for you, you could also try saying <strong>"Make the background red!"</strong>.
                                </li>
                                <hr />
                                <li>
                                    Don't worry if your transcription isn't perfect. You can edit it from the Homepage after saving. Happy Speaking!!!
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SpeechRec;