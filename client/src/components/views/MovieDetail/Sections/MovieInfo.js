import React from 'react';
// 이거.. export default 아니면 {}로 import해주어야 한다고 함
import {Descriptions} from 'antd';

function MovieInfo(props) {
    // 객체 비구조화 할당 이용 (props안에 movie의 속성값을 movie에 할당
    let {movie} = props;
    return (
        // antd디자인
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
