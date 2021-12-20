
const passport = require('passport');
const local = require('./strategy');

const users = require('../models/userSchema');
module.exports = () => {

    passport.serializeUser(function(user, done) {
        //  console.log('serializeUser', user);
      // local변수 안에 담긴 passport.use를 통해 로그인(인증) 성공 시에  return done(null, user); 에서
      //  user에 담긴 값이 serializeUser 함수의 첫번째 인자(user)에 담긴다.
      // 즉 인증에 성공한 후 done으로 두번째 인자로 담긴 값이 
      // serializeUser 함수의 첫번째 인자에 들어가도록 약속되어 있다.
      // 특히 인증에 성공할 시에 세션 정보에 값이 저장되어 있다.
      // 즉, 인증 성공 시에 한번만 실행된다.
    //   console.log(`userID: ${user.id}`)
          done(null, user.id); 
      
        // done 함수 첫번쨰 인자 null은 에러가 없다는 의미이고
        // 두번재 인자인  user.email 은 인증에 성공한 user의 이메일이 담겨있다. 
        // 이것이 향후 세션에 담길 식별자로 활용되므로 아이디나 이메일 하나만 넣는다.
        // 이것이 아래  deserializeUser 함수의 첫번째 인자로 들어간다. 
        
      });
      
               
      
      passport.deserializeUser(function(id, done) {
        //  console.log('deserializeUser', id);

         //serializeUser의 done의 두번째 매개변수(user.id)가 
         // deserializeUser 함수의 첫번째 매개변수(id)로 들어온다.
         // 그러니 결국 id는 user.id를 의미한다.

        users.findById(id, function(err, user) {
           // 몽고디비의 Guest모델(guests컬렉션)에서 user.id로 사용자를 찾아
           // 결과값이 두번째 매개변수(user)에 담긴다.
           // 즉 두번째 매개변수(user)에는 사용자의 모든 정보가 담겨있다.

        //    console.log(`deserializeUserid: ${id}`)
        //    console.log(`deserializeUseruser: ${user}`)
      
           done(err, user);
         
         // done의 두번쨰 매개변수(user)가 req.user에 들어간다.
         // 현재 done의 두번쨰 매개변수(user)에는 사용자의 모든 정보가 들어가있다.
         // 만약 done(err, id);로 하면 req.user에는 사용자으 id만 들어간다.
         // user의 모든 정보를 다 넣는게 좋은 지 , 최소한만 넣는게 좋은 지에 대해서는 의견이 분분하다.
         
         
        });
      });


     local();
    //  const local 변수에 담긴  require('./strategy') 에서 로컬 전략이 먼저 실행되어야 하기 때문에... 
};
