import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    //Landing페이지 왔을 때 제일 먼저 실행되는 메소드
    useEffect(() => {
        //get 요청을 서버에 보냄. endpoint(도착지) = 'api/hello'
        axios.get('/api/hello')
        //서버에서 돌아오는 res를 받아 console창에 출력
        .then(res => console.log(res.data))
    }, [])
    
    return (
        <div>
            LandingPage11
        </div>
    )
}

export default LandingPage
