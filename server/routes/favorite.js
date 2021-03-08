const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite");

// exporess 프레임워크에서 재공하는 router사용 'api/favorite/favoriteNumber' 에서 api/favorite는 index에서 정의
router.post("/favoriteNumber", (req, res) => {
  // body는 index.js의 bodyParser를 이용해서 front에서 보내준 movieId를 받을 수 있는 것임
  // GET방식은 bodyParser안쓰잖아
  
  //mongoDB에서 favorite 숫자 갖고오기 + exec는 mongoDB쿼리임
  Favorite.find({ "movieId": req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // info : 만약 세명이 좋아요 했다면 어떤 사람이 좋아했는지에 대한 정보 []로 있음
    res.status(200).json({
      success: true,
      favoriteNumber: info.length
    });
  });
});


router.post("/favorited", (req, res) => {

  //영화를 Favorite리스트에 넣었는지 o/x 여부를 DB에서 찾기
  Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // 아직 이 영화를 favorite리스트에 넣지 않음
    let result = false ;

    // 만약 영화를 넣었다면
    if(info.length !== 0) {
      result = true;
    }

    res.status(200).json({
      success: true,
      favorited: result
    });
  });
});

module.exports = router;
