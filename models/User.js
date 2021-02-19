const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,     //song woo@na.. -> songwoo 빈칸 없애줌
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {   //관리자1vs일반유저0
        type: Number,
        default: 0
    },
    image: String,
    token: {     //유효성 관리
        type: String 
    },
    tokenExp: {  //토큰 사용할 수 있는 기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {User}  //model을 다른 곳에서 사용할 수 있게 함