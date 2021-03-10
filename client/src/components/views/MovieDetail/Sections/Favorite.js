import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.original_title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    movieId,
    userFrom,
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {


    Axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
      if (!res.data.success) alert("Failed to get Number info");

      console.log(res.data)
      setFavoriteNumber(res.data.favoriteNumber);
    });

    Axios.post("/api/favorite/favorited", variables).then((res) => {
      if (!res.data.success) alert("Failed to get info");

      setFavorited(res.data.favorited);
    });
  }, []);

  const onClickFavorite = () => {
    if(Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(res => {
        if(!res.data.success) alert('리스트에서 지우기 실패했습니다.');

        setFavoriteNumber(FavoriteNumber - 1)
        setFavorited(!Favorited);
      })
    } else {
      Axios.post('/api/favorite/addToFavorite', variables).then(res => {
        if(!res.data.success) alert('리스트에 추가 실패');

        setFavoriteNumber(FavoriteNumber + 1);
        setFavorited(!Favorited);
      })
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite " : "Add to Favorite "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
