import axios from "axios";
import "./MovieList.scss";
import { useState, useEffect, useRef } from "react";

//IMPORT COMPONENT
import SearchBox from "../SearchBox/SearchBox";
import MovieResult from "../MovieResult/MovieResult";

const personalToken = process.env.REACT_APP_PERSONAL_TOKEN;

const MovieList = () => {
  // STATE HOOK FOR MOVIE LIST
  const [movieName, setMovieName] = useState([]);
  // STATE HOOK FOR SEARCH VALUE
  const [searchValue, setSearchValue] = useState("");
  // REF HOOK FOR CLEAR BUTTON
  const formRef = useRef();
  // STATE HOOK FOR CHECKING IF SEARCH IS EMPTY
  const [show, setShow] = useState(false);

  // API RESPONSE AND ERROR HANDLING
  const fetchMovie = async (searchValue) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${personalToken}&type=movie`
    );

    if (response.data.Response === "True") {
      setMovieName(response.data.Search);
      setShow(true);
    } else {
      setMovieName([{ Error: "Movie not found!" }]);
    }
  };

  // SEARCH BUTTON HANDLER
  const searchMovies = (event) => {
    event.preventDefault();
    fetchMovie(searchValue);
  };

  // CLEAR BUTTON HANDLER
  const handleClearBtn = () => {
    setSearchValue("");
    setMovieName([]);
    formRef.current.reset();
    setShow(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchMovie(searchValue);
  }, []);

  // ERROR HANDLING FOR EMPTY SEARCH
  const checkMovieFound =
    show === true ? (
      <div className="app__movie--result">
        <span className="result-title">Results for "{searchValue}"</span>
        <p>click on a movie title to learn more about it</p>

        {movieName.map((movie) => (
          <MovieResult
            movie={movie}
            key={movie.imdbID}
            searchValue={searchValue}
          />
        ))}
      </div>
    ) : (
      <div className="app__movie--result">
        <p>Please enter movie name.</p>
      </div>
    );

  return (
    <div className="app__form">
      <h1>OMDb API</h1>
      <p>The Open Movie Database 🍿</p>
      <SearchBox
        onSubmit={searchMovies}
        setSearchValue={setSearchValue}
        handleClearBtn={handleClearBtn}
        formRef={formRef}
      />
      <br />
      {checkMovieFound}
    </div>
  );
};

export default MovieList;
