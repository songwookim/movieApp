import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";

import MovieInfo from "./Sections/MovieInfo";

import GridCards from "../commons/GridCards";
import {Row} from 'antd';

// rfce + enter
function MovieDetail(props) {
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState();

  // App.js에서 갖고 온 :movieId
  const movieId = props.match.params.movieId;
  useEffect(() => {
    let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });

    fetch(endpointCast)
      .then((res) => res.json())
      .then((res) => {
        setCasts(res.cast);
      });
  }, []);

  const onCastHandler = () => {
    console.log(ActorToggle)
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body  */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie info */}
        <MovieInfo movie={Movie} />
        <br />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={onCastHandler}> Toggle Actor View </button>
        </div>

        <Row gutter={[16, 16]}>
          {ActorToggle &&
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
            ))}
        </Row>
      </div>
    </div>
  );
}

export default MovieDetail;
