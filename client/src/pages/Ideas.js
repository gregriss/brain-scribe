import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import SpeechRecognition from "react-speech-recognition";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import DragandDrop from "../components/DragandDrop";
import FileUpload from "../components/FileUpload";
// import SearchForm from "../components/SearchForm";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Ideas() {
  // Setting our component's initial state
  const [ideas, setIdeas] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all ideas and store them with setIdeas
  useEffect(() => {
    loadIdeas()
  }, [])

  // Loads all ideas and sets them to ideas
  function loadIdeas() {
    API.getIdeas()
      .then(res =>
        setIdeas(res.data)
      )
      .catch(err => console.log(err));
  };

  // function filterIdeas() {
  //   API.getIdeas()
  //     .then(res =>
  //       res.filter(result => {
  //         if (res.data)
  //           console.log('res.data is here: ' + res.data)
  //         return true;
  //       }))
  // }
  // Deletes a book from the database with a given id, then reloads ideas from the db
  function deleteIdea(id) {
    API.deleteIdea(id)
      .then(res => loadIdeas())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // function handleSearch(event) {
  //   event.preventDefault()
  //   filterIdeas()
  // }
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
        .then(res => loadIdeas())
        // .then(res => clearForm())
        .catch(err => console.log(err));
    }
  };
  // function handleUpload() {
  //   // event.preventDefault();
  //   loadIdeas();
  // }
  // function clearForm() {
  //   document.querySelector('#title').textContent = "";
  //   setFormObject({});
  // }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth }
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };
  const [data, dispatch] = React.useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
  )
  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Add a New Idea</h1>
            <Link
              to="/speech"
              style={{ textDecorationColor: 'hsl(239, 75%, 40%)' }}
            >
              <h3 className="text-success">
                Use Speech to Text
                {/* &#10132; */}
              </h3>
            </Link>
          </Jumbotron>
          <div className="card"
            style={{ background: '#eeeef7', padding: '20px 30px', borderLeft: '4px solid #afafd0', borderBottom: '4px solid #8f8fbd' }}
          >
            <form>
              <Input
                id="title"
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                id="author"
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                id="content"
                onChange={handleInputChange}
                name="content"
                placeholder="Content (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Save Idea
            </FormBtn>
            </form>
          </div>
        </Col>
        <Col size="md-6 sm-12">
          <DragandDrop data={data} dispatch={dispatch}>
          </DragandDrop>
          <FileUpload />
          {/* <Jumbotron>
            <h1>My Ideas</h1>
          </Jumbotron> */}
          {/* <SearchForm
            // onChange={handleSearchChange}
            onSubmit={handleSearch}
          /> */}
          <h2 style={{ margin: '30px 0', textAlign: 'center' }}>My Ideas</h2>
          {ideas.length ? (
            <List>
              {ideas.map(idea => (
                <ListItem key={idea._id}>
                  <Link to={"/ideas/" + idea._id}>
                    <strong>
                      {idea.title} by {idea.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteIdea(idea._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3 style={{ color: 'darkgray', textAlign: 'center' }}>No Results to Display &#9785;</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Ideas;