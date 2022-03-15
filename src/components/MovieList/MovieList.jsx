import axios from "axios";
import "./MovieList.scss";
import { useState, useEffect, useRef } from "react";

//IMPORT COMPONENT
import SearchBox from "../SearchBox/SearchBox";
import MovieResult from "../MovieResult/MovieResult";

const MovieList = () => {
  // STATE HOOK FOR MOVIE LIST
  const [movieName, setMovieName] = useState([]);
  // STATE HOOK FOR SEARCH VALUE
  const [searchValue, setSearchValue] = useState("");
  // REF HOOK FOR CLEAR BUTTON
  const formRef = useRef();

  // API RESPONSE AND ERROR HANDLING
  const fetchMovie = async (searchValue) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=6dd08782&type=movie`
    );

    if (response.data.Response === "True") {
      setMovieName(response.data.Search);
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
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchMovie(searchValue);
  }, []);

  return (
    // RENDERING SEARCH BOX
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
      <div className="app__form--result">
        <span className="result-title">Results for "{searchValue}"</span>
        <p>click on a movie title to learn more about it</p>

        {/* RENDERING MOVIE RESULT */}
        {movieName.map((movie) => (
          <MovieResult
            movie={movie}
            key={movie.imdbID}
            searchValue={searchValue}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
