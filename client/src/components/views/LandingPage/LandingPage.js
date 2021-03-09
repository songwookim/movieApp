import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config.js";
import MainImage from "./Sections/MainImage";

import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  // 많은 정보들을 배열에 넣어야 하므로 []
  // Movies정보들을 state관리하자
  const [Movies, setMovies] = useState([]);
  // 가장 인기있는 로고 state관리 + props로 넘기기
  const [MainMovieImage, setMainMovieImage] = useState(null);
  // state에 현재 페이지 수 기록
  const [CurrentPage, setCurrentPage] = useState(0);

  //API정보 갖고 오기
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  },[]);

  //영화DB 받아오기
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        //state에 저장
        setMovies([...Movies, ...res.results]);
        setMainMovieImage(res.results[0]);
        setCurrentPage(res.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage +1}`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* backdrop_path는 console.log(res.results) 로 확인 */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* 이미지 사이 여백 주기 */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
