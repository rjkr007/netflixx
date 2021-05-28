import React, { useEffect, useState } from "react";
import axios from "./axios";
import './Row.css'; 
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl,isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  // code which runs and gets data on specific condition

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //"https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_networks=213"
      //   console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // if [], run once when the row loads, and don't run again.
  }, [fetchUrl]);
  // console.log(movies);

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const handleClick = (movie) => {
  if (trailerUrl) {
    setTrailerUrl('');
  } else {
    movieTrailer(movie?.name || "") 
    .then(url => {
      const urlParams = new URLSearchParams(new URL(url).search);
setTrailerUrl(urlParams.get('v'));
console.log(urlParams.get('v'));
    }).catch(error => console.log(console.error()))
  }
}


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/*several row_poster(s) */}
        {movies.map((movie) => (
          <img
          key={movie.id}
          onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      <div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
