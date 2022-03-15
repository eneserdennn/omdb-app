import { Accordion, Container, Row, Col } from "react-bootstrap";

const MovieResult = ({ movie }) => {
  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{movie.Title}</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                {movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="app__movie--result--img"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x450"
                    alt={movie.Title}
                    className="app__movie--result--img"
                  />
                )}
              </Col>
              <Col>
                <p>
                  <b>{movie.Title}</b>
                </p>
                <p>
                  <b>Year:</b> {movie.Year}
                </p>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MovieResult;
