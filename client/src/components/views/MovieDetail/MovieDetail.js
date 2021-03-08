import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";

import MovieInfo from "./Sections/MovieInfo";

import GridCards from "../commons/GridCards";
import { Row } from "antd";

import Favorite from "./Sections/Favorite";
// rfce + enter
function MovieDetail(props) {
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);

  // App.js에서 갖고 온 :movieId
  const movieId = props.match.params.movieId;
  useEffect(() => {
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointInfo);
  });

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };
  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>Loading...</div>
      )}

      {/* Body  */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* 로그인 했을 때 유저ID를 로컬저장소에 저장했기에 여기에 접근해서 갖고올 수 있다. */}
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>

        {/* Movie info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>Loading...</div>}
        <br />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}> Toggle Actor View </button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {!LoadingForCasts ? (
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    actorName={cast.name}
                  />
                </React.Fragment>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
