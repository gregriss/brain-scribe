import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [idea, setIdea] = useState({})

  // When this component mounts, grab the idea with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { ideaid } = useParams() // think useContext
  useEffect(() => {
    API.getIdea(ideaid)
      .then(res => setIdea(res.data))
      .catch(err => console.log(err));
  }, [ideaid])

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
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Content</h1>
            <p>
              {idea.content}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link
            to="/"
            style={{ color: "hsl(239, 75%, 40%)" }}>← Back to Ideas</Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;
