const express = require("express");
// expresss 모듈을 node_modules로 부터 갖고 온다.
const app = express();
const port = 5000;

const config = require("./config/key");
const mongoose = require("mongoose");
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
// 클라이언트에서 받아온 정보를 서버사이드에서 분석해서 req할 수 있도록 하는 것이 bodyParser의 역할

// application/x-www-form-urlencoded 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.json());

// 회원가입을 위한 route
app.post("/register", (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면 (req by User.js)
  // 그것들을 db에 넣어준다

  // req.body에는 { id: "thddn", ... } 에 대한 정보가 json타입으로 담겨 있음
  // 이러한 것은 bodyParser를 이용하였기에 가능한 것임
  const user = new User(req.body);

  // mongoDB 메소드이며, save해주면 정보들이 user모델에 저장됨.
  user.save((err, doc) => {
    //실패 시에 false와 err메세지 전송
    if (err) return res.json({ success: false, err: err });
    // status(200) 성공했다는 표시
    return res.status(200).json({
      success: true,
    });
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));
