import React, { useEffect, useState } from "react";
import Axios from "axios";

// MovieDetail에 직접 추가해도 되지만, 복잡해지기에 여기에 따로 작성

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.original_title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId
  };
  useEffect(() => {

    // 얼마나 많은 사람이 이 영화를 favorite 리스트에 넣었는지 숫자정보 얻기
    // 정보얻기는 fetch / axios 둘 중 하나 사용 + get/post는 상관 x
    // 지금 껏 endpoint로 서버에서 이미지+정보 갖고 온 것 처럼 우리도 로컬서버에 데이터 요청
    Axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
      if (!res.data.success) {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
      setFavoriteNumber(res.data.FavoritdNumber)
    }, []);

    Axios.post("/api/favorite/favorited", variables).then((res) => {
      if (!res.data.success) {
        alert("정보를 가져오는데 실패했습니다.");
      }
      setFavorited(res.data.Favorited);
    });
  }, []);

  

  return (
    <div>
      <button>{Favorited? "Not Fatorite" : "Add to Favorite "} {FavoriteNumber}</button>
    </div>
  );
}

export default Favorite;
