import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [idea, setIdea] = useState({})
  const [formObject, setFormObject] = useState({})
  // When this component mounts, grab the idea with the _id of props.match.params.id
  // e.g. localhost:3000/ideas/599dcb67f0f16317844583fc
  const { ideaid } = useParams() // think useContext
  useEffect(() => {
    API.getIdea(ideaid)
      .then(res => setIdea(res.data))
      .catch(err => console.log(err));
  }, [ideaid])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveIdea({
        title: formObject.title,
        author: formObject.author,
        content: formObject.content
      })
        // .then(res => loadIdeas())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {idea.title} by {idea.author}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-8 lg-6">
          <form>
            <h3>Update Your Idea</h3>
            <Input
              id="title"
              onChange={handleInputChange}
              name="title"
              defaultValue={idea.title}
              placeholder="Title (required)"
            />
            <Input
              id="author"
              onChange={handleInputChange}
              name="author"
              defaultValue={idea.author}
              placeholder="Author (required)"
            />
            <TextArea
              id="content"
              onChange={handleInputChange}
              name="content"
              defaultValue={idea.content}
              placeholder="Content (Optional)"
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Update Idea
            </FormBtn>
          </form>
        </Col>
      </Row>
      {/* <Row>
        <Col size="md-10 md-offset-1">
          <article style={{ margin: '15px' }}>
            <h2>Content</h2>
            <p contentEditable>
              {idea.content}
            </p>
          </article>
        </Col>
      </Row> */}
      <Row>
        <Col size="md-4">
          <Link
            to="/ideas"
            style={{ display: 'block', color: "hsl(239, 75%, 40%)", margin: '15px' }}
          >
            ← Back to Ideas
          </Link>
          <Link
            to="/speech"
            style={{ color: "hsl(239, 75%, 40%)", margin: '15px' }}
          >
            Add Idea with Speech to Text &#10132;
          </Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;
