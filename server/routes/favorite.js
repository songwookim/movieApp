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
    console.log(info);
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

module.exports = router;