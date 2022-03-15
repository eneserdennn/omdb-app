import axios from "axios";
import { Accordion, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./MovieResult.scss";
import { useState, useEffect } from "react";

const MovieResult = ({ movie }) => {
  // STATE FOR MOVIE DETAILS
  const [movieInfo, setMovieInfo] = useState([]);
  // STATE FOR MODAL
  const [show, setShow] = useState(false);

  // HANDLE CLOSE AND SHOW MODAL
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // GET MOVIE DETAILS
  const fetchMovieDetail = async (movie) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=6dd08782`
    );

    setMovieInfo(response.data);
  };

  // GET MOVIE DETAILS ON MOUNT
  useEffect(() => {
    fetchMovieDetail(movie);
  }, []);

  return (
    <Container>
      {/* ERROR HANDLING FOR WRONG SEARCH */}
      {movie.Error ? (
        <div className="app__movie--result">
          <p>{movie.Error}</p>
        </div>
      ) : (
        <Accordion className="app__movie--result">
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
                    <span className="result-title">Year:</span> {movie.Year}
                  </p>
                  <p>
                    <span className="result-title">IMDB Rating:</span>{" "}
                    {movieInfo.imdbRating}
                  </p>
                  <Button variant="primary" onClick={handleShow}>
                    More Detail
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{movie.Title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                          <p>
                            <span className="result-title">Director: </span>
                            {movieInfo.Director}
                          </p>
                          <p>
                            <span className="result-title">Writer: </span>
                            {movieInfo.Writer}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <span className="result-title">Genre: </span>
                            {movieInfo.Genre}
                          </p>

                          <p>
                            <span className="result-title">Actors: </span>
                            {movieInfo.Actors}
                          </p>
                          <p>
                            <span className="result-title">Plot: </span>
                            {movieInfo.Plot}
                          </p>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
};

export default MovieResult;
