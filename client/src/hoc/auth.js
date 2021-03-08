import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  //SpecificComponent : auth가 감싸안은 컴포넌트
  //option 1)null : 아무나 출입이 가능한 페이지
  //       2)true : only login
  //       3)false : without only login
  // adminRoute값이 따로 주어지지 않았다면 null / admin only면 true값을 따로 주면 된다.
  function Authenticationcheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        // console.log(res.payload)
        // console.log(option)
        // 로그인 X 상태에서
        if (!res.payload.isAuth) {
          //only login페이지 요청 받았을 때
          if(option) {
            props.history.push("/login");
          }
          // 로그인 O 상태
        } else {
          // admin페이지 요청 받았을 때
          if (adminRoute && !res.payload.isAdmin) {
            //차단
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    });
    return <SpecificComponent {...props} user={user}/>;
  }
  return Authenticationcheck;
}
