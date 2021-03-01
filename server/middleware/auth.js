const { User } = require('../models/User');
// 인증처리
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰 갖고 오기
    let token = req.cookies.x_auth;
    
    // token을 decode해서 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        // index.js의 req에서 token과 user을 사용할 수 있도록 저장
        req.token = token;
        req.user = user;

        // ( , auth,  ....) 미들웨어에서 계속 갈 수 있도록 해야함
        next();
    })

    // 유저가 있으면 인증 o

    // 유저가 없으면 인증 x
}

module.exports = { auth };