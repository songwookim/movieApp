import React, { useEffect, useState } from "react";
import Axios from 'axios';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.original_title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  useEffect(() => {
    let variables = {
      movieId,
      userFrom,
      movieTitle,
      moviePost,
      movieRunTime,
    };


    Axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
      if (!res.data.success) alert("Failed to get Number info");

      console.log(res.data.FavoriteNumber)
      setFavoriteNumber(res.data.FavoriteNumber);
    });

    Axios.post("/api/favorite/favorited", variables).then((res) => {
      if (!res.data.success) alert("Failed to get info");

      setFavorited(res.data.Favorited);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button>
        {Favorited ? "Not Favorite " : "Add to Favorite "}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
