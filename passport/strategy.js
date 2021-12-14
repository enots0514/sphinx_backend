const mongoose = require('mongoose');
const users = require('../models/userSchema');

/* 
// mongoose 암호 없이 로그인 일반 원리
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


// mongoose 암호 없이 로그인 일반 원리에 상태만 추가하기 
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
                                    
                                    //  console.log(req.session.nickNAME)
                                    //  console.log(req.session.isLogin)   



                                res.render('home/index', {nicname:`에 ${user.nicname}님 로그인 하셨습니다.`}); 
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

       