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
    // console.log(value);
    setFormObject({ ...formObject, [name]: value })
    setIdea({
      title: idea.title,
      author: idea.author,
      content: idea.content
    })
  };

  function deleteIdea(ideaid) {
    console.log('deleting old idea');
    API.deleteIdea(ideaid)
      // .then(res => loadIdeas())
      .catch(err => console.log(err));
  }
  // function putIdea(e) {
  //   e.preventDefault();
  //   console.log(ideaid);
  //   API.updateIdea((ideaid, {
  //     title: formObject.title,
  //     author: formObject.author,
  //     content: formObject.content
  //   })
  // .then(res => setIdea(res.data))
  //     .then(res => console.log('updated idea ' + res))
  //     .catch(err => console.log('error!!!' + err))
  // }
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveIdea({
        title: formObject.title,
        author: formObject.author,
        content: formObject.content
      })
        .then(res => deleteIdea(ideaid))
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h2
              onChange={handleInputChange}
            >
              {idea.title} by {idea.author}
            </h2>
            {/* <h5>{idea.date}</h5> */}
          </Jumbotron>
        </Col>
      </Row>
      <Row >
        <Col size="md-6">
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/ideas"
              style={{ color: "hsl(239, 75%, 40%)", margin: '0 15px 0 0' }}
            >
              ← Back to Ideas
            </Link>
            <Link
              to="/speech"
              style={{ color: "hsl(239, 75%, 40%)" }}
            >
              Add Idea with Speech to Text &#10132;
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col size="md-8 lg-6">
          <div className="card"
            style={{ background: '#eeeef7', padding: '20px 30px', borderLeft: '4px solid #afafd0', borderBottom: '4px solid #8f8fbd' }}
          >
            <h3 className="card-title">Type to Edit</h3>
            <form>
              <Input
                id="title"
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
                defaultValue={idea.title}
              />
              <Input
                id="author"
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
                defaultValue={idea.author}
              />
              <TextArea
                id="content"
                onChange={handleInputChange}
                name="content"
                defaultValue={idea.content}
                placeholder="Content (Optional)"
              />
              <FormBtn
                // disabled={!(formObject.author && formObject.title)}
                // disabled={!handleInputChange}
                onClick={handleFormSubmit}
              // onClick={putIdea}
              >
                Update Idea
            </FormBtn>
            </form>
          </div>
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

    </Container>
  );
}

export default Detail;
