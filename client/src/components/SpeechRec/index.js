// import React from "react";
// import PropTypes from "prop-types";
// import SpeechRecognition from "react-speech-recognition";
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";


// tried to do vanilla JS
// function SpeechRec() {

//     var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
//     var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
//     var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//     // var recognizing;
//     var recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     reset();
//     recognition.onend = reset;

//     recognition.onresult = function (event) {
//         for (var i = event.resultIndex; i < event.results.length; ++i) {
//             if (event.results[i].isFinal) {
//                 textarea.value += event.results[i][0].transcript;
//             }
//         }
//     }

//     function reset() {
//         recognizing = false;
//         button.innerHTML = "Click to Speak";
//     }

//     function toggleStartStop() {
//         if (recognizing) {
//             recognition.stop();
//             reset();
//         } else {
//             recognition.start();
//             recognizing = true;
//             button.innerHTML = "Click to Stop";
//         }
//     }

//     return (
//         <div>
//             <textarea id="textarea" rows='10' cols='20'>Text appears here...</textarea>
//             <button id="button" onclick={toggleStartStop}>Toggle Start/Stop</button>
//         </div>
//     )
// }

// export default SpeechRec;





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