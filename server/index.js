const express = require("express");
// expresss 모듈을 node_modules로 부터 갖고 온다.
const app = express();
const port = 5000;
const config = require("./config/key");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!!!"));
// '/'에 오면 'Hello World!!!!' 출력

const { User } = require("./models/User.js");
const bodyParser = require("body-parser");
// 클라이언트에서 받아온 정보를 서버사이드에서 분석해서 res할 수 있도록 하는 것이 bodyParser의 역할

// application/x-www-form-urlencoded 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

// 회원가입을 위한 route
app.post("/api/users/register", (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면 (req by User.js)
  // 그것들을 db에 넣어준다

  // req.body에는 { id: "thddn", ... } 에 대한 정보가 json타입으로 담겨 있음
  // 이러한 것은 bodyParser를 이용하였기에 가능한 것임
  const user = new User(req.body);
  // mongoDB 메소드이며, save해주면 정보들이 user모델에 저장됨.
  user.save((err, doc) => {
    //실패 시에 false와 err메세지 전송
    if (err) return res.json({ success: false, err });
    // status(200) 성공했다는 표시
    return res.status(200).json({
      success: true,
    });
  });
});

//login route
app.post("/api/users/login", (req, res) => {
  // 1) 요청된 이메일을 db에서 있는지 찾기
  // mongoDB제공 메소드 사용 + const user = new User(req.body); 과정을 같이 진행시켜준듯
  User.findOne({ email: req.body.email }, (err, user) => {
    //User 데이터set(DB) 안에 req.body.email(client input email)이 없다면
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 2) 요청한 이메일이 db에 있다면 비밀번호가 맞는지 확인 by isMatch, 자체 메소드
    // user는 User에서 찾은 이메일이 맞는 user정보 담겨 있음, mongoose 모델임
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 3) 비밀번호까지 맞다면 토큰 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장하자. Cookie / localStorage 각각의 장점이 있음. 우리는 cookie를 사용하자
        // Name: x_auth, 내용 : user.token
        res
          .cookie("x_auth", user.token)
          //성공했다는 표시
          .status(400)
          .json({
            loginSuccess: true,
            userId: user._id,
          });
      });
    });
  });
});
// express에서 제공하는 Router를 사용해서 정리해야함 by  '/api/user..', '/api/product...', comment
// auth라는 middleware(중간에서 무언가 해줌)
// (role 1 admin, role 0 user)
const { auth } = require('./middleware/auth.js')
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어 통과했다는 얘기는 auth가 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    lastname: req.user.lastname,
    image: req.user.image
  })
})

//logout route
app.get('/api/users/logout', auth, (req, res) => {
  //로그아웃 하려는 유저를 db에서 찾기
  //찾아서 업데이트해주는 메소드 + auth middleware에서 req.user._id 찾아오기
  User.findOneAndUpdate({_id: req.user._id}, { token: ""}, (err, user) => {
    if(err) return res.json({success: false, err})
    return res.status(200).send({
      success: true
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
