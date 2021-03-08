const express = require("express");
const app = express();

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


const bodyParser = require("body-parser");
// 클라이언트에서 받아온 정보를 서버사이드에서 분석해서 res할 수 있도록 하는 것이 bodyParser의 역할

// application/x-www-form-urlencoded 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());


// 이 문장이 없다면 모든 service API들을 여기에 정의해서 index.js가 더러워짐 ..
// 리액트 컴포넌트라고 생각하면 편할 듯
app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/users'));
// app.use('/api/comment', require('./routes/users'));
// app.use('/api/like', require('./routes/users'));


const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
