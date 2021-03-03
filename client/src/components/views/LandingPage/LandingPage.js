import React, { useEffect } from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
  //Landing페이지 왔을 때 제일 먼저 실행되는 메소드
  useEffect(() => {
    //get 요청을 서버에 보냄. endpoint(도착지) = 'api/hello'
    axios
      .get("/api/hello")
      //서버에서 돌아오는 res를 받아 console창에 출력
      .then((res) => console.log(res.data));
  }, []);

  const onClickHandler = () => {
    axios.get("api/users/logout").then((res) => {
      if (res.data.success) {
        alert("로그아웃 되었습니다.")
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <br />
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
