import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';

import MovieInfo from './Sections/MovieInfo';

// rfce + enter
function MovieDetail(props) {
    const [Movie, setMovie] = useState([])

    // App.js에서 갖고 온 :movieId
    const movieId = props.match.params.movieId;
    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpointInfo)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            })
    });
    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body  */}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                {/* Movie info */}
                <MovieInfo movie={Movie}/>
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button> Toggle Actor View </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
