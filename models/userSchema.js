const mongoose = require("mongoose");
const {Schema} = mongoose;
 const bcrypt = require('bcrypt');
 const saltRounds = 10;



// 스키마 생성
const userSchema = new Schema({
  email: {type:String, required:true, unique:true},
  pwd: {type:String, required:true},
  nicname: {type:String, required:true},
  confirm: {type:String},
  date:{type:Date, default:Date.now}
});

// bcrypt.js를 활용해 암호화된 비번을 DB에 저장하기
userSchema.pre('save', function(next) {
     const user = this; // userSchema를 가르킨다.

  if(user.isModified('pwd') ||user.isNew) {
    bcrypt.genSalt(saltRounds, function(err, salt){
      // saltRounds로 암호화에 사용하는 salt를 genSalt한다.
      if(err) return next(err);
 
 
      bcrypt.hash(user.pwd, salt, function(err, hash) {
        //  user.pwd는 입력한 원형의 비번을 salt로 암호화(hash)한다.  
        // function(err, hash)의 hash가 암호화된 비번 
          if(err) {
              console.log("비밀번호 해시과정 중에 에러가 발생했습니다.");
              return next(err);
          } else {
            // 암호호된 값을 비번에 넣는다.
            user.pwd = hash;
            next()
          }
       }) 
     })
  } else {
    next();
  }
      
});



// passport 활용시 삭제 - 로컬 전략 안으로 들어감
// 몽구스 로그인 시 해시된 비번을 검증하는 comparePwd 메서드
userSchema.methods.comparePwd = function(pwd, cb) {

  // 여기 function(pwd, cb)는 
  // 몽구스 로그인 컨트롤러에 추가할 코드인 
  // user.comparePwd(req.body.pwd, function(err, isMatch) { 에서
  //  pwd는 req.body.pwd 로 입력한 원형의 비번을
  // cb는 function(err, isMatch) 이 콜백을 의미함.

    bcrypt.compare(pwd, this.pwd, function(err, isMatch) {
      // 입력한 비번(pwd)과 해시되어 저장된 비번을 (this.pwd) 
      //  bcrypt 자체의 메서드 compare()로 비교해 맞는 지 체크 
      // 맞은 경우에 isMatch에는 true가 담김.
      if(err) {
        return cb(err);
        // 에러 발생시 콜백에 err만 출력
       } else {
         cb(null, isMatch)
         // 맞다면 콜백에 에러는 없고(null) 맞다는 isMatch 넘김 
       }
   })
}

module.exports = mongoose.model('users', userSchema);