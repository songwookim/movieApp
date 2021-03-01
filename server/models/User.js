const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //song woo@na.. -> songwoo 빈칸 없애줌
    unique: 1,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    //관리자1vs일반유저0
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    //유효성 관리
    type: String,
  },
  tokenExp: {
    //토큰 사용할 수 있는 기간
    type: Number,
  },
});

// * arrow function explicitly prevent binding this !!
const bcrypt = require("bcrypt");
// saltRounds = salt가 몇 글자?
// salt를 생성한 뒤, 이를 이용해서 비밀번호를 암호화 한다.
const saltRounds = 10;
//mongoose에서 갖고온 메소드 pre, 인자로 'save'를 주면, save메소드 실행 전에 실행할 행동에 대해서 기술하면 된다.
userSchema.pre("save", function (next) {
  var user = this;

  //모델에서 password가 변경될 때만 암호화 코드 실행
  if (user.isModified("password")) {
    //비밀번호를 암호화한다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //next()함수로 save메소드 실행하도록 보내기
      if (err) return next(err);
      // myPlaintextPassword(user.password) : 클라이언트가 순수하게 요청한 비밀번호 값 12345같은 거
      // hash는 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


userSchema.methods.comparePassword = function (plainPassword,callback_func) {
  //plainPassword 12345   this.password @#!@r512r13rdsd
  //왜냐? 지금 userSchema는 DB에서 이메일로 찾아낸 user이기에 this.password가 암호화된 패스워드임
  //plainPassword는 index.js에서 넘긴 req.body.password
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //비밀번호가 같지 않다면
    if (err) return callback_func(err);
    callback_func(null, isMatch);
  });
};

const jwt = require('jsonwebtoken')
userSchema.methods.generateToken = function (callback_func) {
  var user = this;

  // jwt를 이용해서 token 생성하기
  // user._id + 'x_auth' = token, 나중에 user._id를 찾을 때 'x_auth' 을 이용해서 찾을 수 있음
  var token = jwt.sign(user._id.toHexString(),'secret');

  user.token = token;
  user.save(function(err, user) {
    if(err) return callback_func(err)
    //db에 save잘 되었다면 user정보만 넘기기
    callback_func(null, user)
  })
 }

 userSchema.statics.findByToken = function(token, callback_func) {
   var user = this;

   // 토큰 decode, decoded = userId
   // jwt 홈페이지에 verify 사용하는 방법 참고
   jwt.verify(token, 'secret', function(err, decoded) {
    //유저 아이디를 이용해 유저를 찾은 뒤
    //client에서 가져온 token과 db에 보관된 토큰 일치하는지 확인

    //monogoDB 메소드 이용해서 userId와 token을 이용해 찾기
    user.findOne({"_id": decoded, "token": token}, function(err,user){
      if(err) return callback_func(err);
      callback_func(null, user)
    })
   })
 }
const User = mongoose.model("User", userSchema);

module.exports = { User }; //model을 다른 곳에서 사용할 수 있게 함
