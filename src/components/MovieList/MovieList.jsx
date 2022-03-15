import axios from "axios";
import "./MovieList.scss";
import { useState, useEffect } from "react";
import MovieResult from "../MovieResult/MovieResult";
import SearchBox from "../SearchBox/SearchBox";

const MovieList = () => {
  const [movieName, setMovieName] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchMovie = async (searchValue) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=harry&apikey=6dd08782&type=movie`
    );

    if (response.data.Response === "True") {
      setMovieName(response.data.Search);
    } else {
      setMovieName([{ Error: "Movie not found!" }]);
    }
  };

  const searchMovies = (event) => {
    event.preventDefault();
    fetchMovie(searchValue);
  };

  useEffect(() => {
    fetchMovie(searchValue);
  }, []);

  return (
    <div className="app__form">
      <h1>OMDb API</h1>
      <p>The Open Movie Database 🍿</p>

      <SearchBox onSubmit={searchMovies} />
      <br />

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
    </div>
  );
};

export default MovieList;
