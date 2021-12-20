
// passport 없이 로그인 하기
/*
const mongoose = require('mongoose');
const users = require('../models/userSchema');
*/

/* 
// mongoose 암호 없이 로그인 일반 원리 1
module.exports.login = (req, res) => {
   
    users.findOne({email: req.body.email})
         .then( user => { 
                          if(user) {
                                if(user.pwd == req.body.pwd){
                                    console.log("로그인 되었습니다.");
                                res.render('home/index', {nicname:`${user.nicname}님 로그인 되었습니다`}); 
                                }else{
                                    console.log("비번이 틀렸습니다.") ;
                                res.render('auth/login', {formTitle:"비번이 틀렸습니다"});
                                }
                          } 
                          else {
                            console.log("유저 정보가 없습니다.");
                            res.render('auth/login', {formTitle:"유저 정보가 없습니다."});
                          }                           
         })
         .catch( err => {
            console.log(`로그인 중 에러 발생함: ${err}`);
         })
};
*/

/*
// mongoose 암호 없이 로그인 일반 원리에 상태만 추가하기 2
module.exports.login = (req, res) => {
   
    users.findOne({email: req.body.email})
         .then( user => { 
                          if(user) {
                                if(user.pwd == req.body.pwd){
                                    console.log("로그인 되었습니다.");

                                    // res.cookie('monster', 'nom nom')

                                    req.session.email = req.body.email;                                        
                                    req.session.isLogin = 'true';
                                    req.session.nickNAME = user.nicname;

                                    req.session.save();
                                    
                                    //   console.log(req.session)
                                    //  console.log(req.session.isLogin)   



                                res.render('home/index', {nicname:`에 ${user.nicname}님 로그인 하셨습니다.`}); 
                                }else{
                                    console.log("비번이 틀렸습니다.") ;
                                    req.flash("error", "password error" )
                                    res.render('auth/login', {formTitle:req.flash().error});
                                // res.render('auth/login', {formTitle:"비번이 틀렸습니다"});
                                }
                          } 
                          else {
                               console.log(`유저 정보가 없습니다.`);
                                req.flash("error", "userInfo error" )
                                
                                    res.render('auth/login', {formTitle:req.flash().error});
                                // res.render('auth/login', {formTitle:"유저 정보가 없습니다."});
                                
                          }                           
         })
         .catch( err => {
            console.log(`로그인 중 에러 발생함: ${err}`);
         })
};
/*

/*
// mongoose 암호 검증(bcrypt)  로그인 일반 원리 3
module.exports.login = (req, res) => {
   
    users.findOne({email: req.body.email})
         .then( user => { 
                          if(user) {

                                user.comparePwd(req.body.pwd, function(err, isMatch){
                                    if(err) {
                                        console.log("로그인 중 에러 발생함.");
                                        next(err);
                                    } else if(null, !isMatch){
                                        console.log("비번이 틀렸습니다.") ;
                                        // console.log(`isMatch: ${isMatch}`) ;
                                          // 이때 isMatch 값이 false
                                        req.flash("error", "password error" )
                                        res.render('auth/login', {formTitle:req.flash().error});                            
                                        return;
                                    }
                                    console.log("로그인 되었습니다.");
                                    // console.log(`isMatch: ${isMatch}`) ;
                                    // 이때 isMatch 값이 true
                                    req.session.email = req.body.email;                                        
                                    req.session.isLogin = 'true';
                                    req.session.nickNAME = user.nicname;

                                    req.session.save();

                                    res.render('home/index', {nicname:`에 ${req.session.nickNAME}님 로그인 하셨습니다.`});
                                })
                        
                          } 
                          else {
                               console.log(`유저 정보가 없습니다.`);
                                req.flash("error", "userInfo error" )
                                res.render('auth/login', {formTitle:req.flash().error});
                               }                           
         })
         .catch( err => {
            console.log(`로그인 중 에러 발생함: ${err}`);
         })
};

*/

// 위에는 passport 없이 로그인 하는 방법이고 아래는 passport.js 활용
// passport-local 전략만을 따로 파일로 만들었다.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const users = require('../models/userSchema');
const bcrypt = require('bcrypt');

module.exports = () => {

    passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd',

    // passport는 usernameField가 username,
    //  passwordField가 password로 정해져 있으므로
    // form에서 name으로 지정한 key를 그 필드에 사용한다는 의미이다.
    }, async(username, password, done) => {

        try{

            const User = await users.findOne({'email':username});
            if(User) {
                    const result = await bcrypt.compare(password, User.pwd);
                    
                    if(result) {
                        // console.log(`User: ${User}`);
                        
                        done(null, User);
                    } else {
                        done(null, false, {message: `비밀번호가 일치하지 않습니다.`});
                    }
                        
            } else {
                done(null, false, {message: `회원정보가 없습니다.`})
            }


         } catch (error) {
            console.error(error);
            done(error);
         }
    }));
};