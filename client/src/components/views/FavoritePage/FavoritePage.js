import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./favorite.css";
import { Button, Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";
import NavBar from "../NavBar/NavBar";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavoredMovie();
  }, []);
  
  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
        userFrom: localStorage.getItem("userId"),
      }).then((res) => {
        console.log(res.data)
        if (!res.data.success) alert("영화 정보를 가져오는데 실패했습니다.");
        setFavorites(res.data.favorites);
      });
  }

  const onClickDelete = (movieId, userFrom) => {
      const variables = {
          movieId,
          userFrom 
      }
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
            console.log(res.data)
            if(!res.data.success) alert("리스트에서 지우는데 실패했습니다.");
            fetchFavoredMovie();
        })
  }
  const renderCards = Favorites.map((favorite, idx) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "No Image"
        )}
      </div>
    );
    return (
      <tr key={idx}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime}</td>
        <td>
          <Button onClick={() => {onClickDelete(favorite.movieId, favorite.userFrom)}}>Remove</Button>
        </td>
      </tr>
    );
  });
  
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
        <NavBar />
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
