const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite.js");

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      favoriteNumber: info.length,
    });
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) res.status(400).send(err);

    let result = false;
    // 만약 영화를 넣었다면
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({
      success: true,
      favorited: result,
    });
  });
});

// DB로 부터 지우기
router.post("/removeFromFavorite", (req, res) => {
  // 쿼리, 다음의 값을 이용해 삭제한다.
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  })
    // 쿼리 작동시키는 메소드
    .exec((err, result) => {
      
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true});
    });
});



// DB로부터 Favorite 정보 추가하기
router.post("/addToFavorite", (req, res) => {
  // 인스턴스에 우리가 갖고온 정보들을 넣고 만들자
  const favorite = new Favorite(req.body);
  favorite.save((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

//DB에서 좋아요 무비 불러오기
router.post("/getFavoredMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      favorites,
    });
  });
});



module.exports = router;
