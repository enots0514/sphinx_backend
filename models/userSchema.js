const mongoose = require("mongoose");
const {Schema} = mongoose;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;



// 스키마 생성
const userSchema = new Schema({
  email: {type:String, required:true, unique:true},
  pwd: {type:String, required:true},
  nicname: {type:String, required:true},
  confirm: {type:String},
  date:{type:Date, default:Date.now}
});

/*최종

userSchema.pre('save', function(next) {
     const user = this; // userSchema를 가르킨다.

  if(user.isModified('pwd') ||user.isNew) {
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err);
 
 
      bcrypt.hash(user.pwd, salt, function(err, hash) {
        
          if(err) {
              console.log("비밀번호 해시과정 중에 에러가 발생했습니다.");
              return next(err);
          } else {
            user.pwd = hash;
            next()
          }
       }) 
     })
  } else {
    next();
  }
      
});

*/

/* passport 활용시 삭제 - 로컬 전략 안으로 들어감
guestSchema.methods.comparePwd = function(pwd, cb) {

    bcrypt.compare(pwd, this.pwd, function(err, isMatch) {
      if(err) {
        return cb(err);
       } else {
         cb(null, isMatch)
       }
   })
}

*/

module.exports = mongoose.model('users', userSchema);