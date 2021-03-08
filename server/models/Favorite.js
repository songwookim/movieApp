const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
    userFrom: {
        // ObejctId + ref 정보로 User.js에 있는 모든 정보를 얻어올 수 있다.
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
    // 생성된 시간 자동으로 처리
}, { timestamps: true});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
